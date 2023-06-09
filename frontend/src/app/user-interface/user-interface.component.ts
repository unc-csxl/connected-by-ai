import { AfterViewInit, Component, EnvironmentInjector, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MockAppEventsService } from '../mock-app-events.service';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { AppEvent, AppEventType, AppEventsService } from '../app-events.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

export enum State {
  IDLE = "IDLE",
  ONE_PERSON = "ONE_PERSON",
  MULTIPLE_PEOPLE = "MULTIPLE_PEOPLE",
  ONE_PERSON_WAVING = "ONE_PERSON_WAVING",
  TWO_PEOPLE_WAVING = "TWO_PEOPLE_WAVING",
  GENERATING = "GENERATING",
  PRESENTING = "PRESENTING"
};

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css'],
  animations: [
    trigger('enterTrigger', [
      transition(':enter', [style({opacity: 0, zIndex: 20, top: 0}), animate("2000ms ease-in", style({opacity: 1, zIndex: 20}))]),
      transition(':leave', [style({opacity: 1, zIndex: 1, top: 0}), animate("2000ms ease-in", style({opacity: 0, zIndex: 1}))]),
    ])
  ]
})
export class UserInterfaceComponent implements AfterViewInit {

  @Input()
  test: boolean = false;

  State = State;

  events$?: Observable<AppEvent>;
  eventsSubscription!: Subscription;

  private currentState: State = State.IDLE;
  private state: Subject<State> = new BehaviorSubject<State>(this.currentState);
  state$: Observable<State> = this.state.asObservable();

  constructor(private mockEventsService: MockAppEventsService, private injector: EnvironmentInjector) {
  }

  ngAfterViewInit(): void {
    if (this.events$) { return; }

    if (this.test) {
      this.events$ = this.mockEventsService.events$;
      this.eventsSubscription = this.events$.subscribe((event) => this.onEvent(event));
    } else {
      this.injector.runInContext(() => {
        let appEventService = inject(AppEventsService);
        this.events$ = appEventService.events$;
        this.eventsSubscription = this.events$.subscribe((event) => this.onEvent(event));
      });
    }
  }

  /** Updates the current state to a new state.
  * @param state: a valid State enum type representing the new state.
  */
  private changeState(state: State) {
    this.currentState = state;
    this.state.next(state);
  }

  /** Handles transitions between the current state to the new state.
  * @param event: a valid AppEvent model representing the new event
  */
  private onEvent(event: AppEvent) {
    /** We don't handle events on the TWO_PEOPLE_WAVING state because the application should automatically
     * transition to the GENERATING state when it receives a TWO_WAVES_DETECTED event.
     * We also don't handle the PRESENTING state because it should automatically switch to IDLE after
     * 15 seconds.
     */
    switch(this.currentState) {
      case State.IDLE:
        this.handleIdleEvent(event);
        break;
      case State.ONE_PERSON:
        this.handleOnePersonEvent(event);
        break;
      case State.MULTIPLE_PEOPLE:
        this.handleMultiplePeopleEvent(event);
        break;
      case State.ONE_PERSON_WAVING:
        this.handleOneWavingEvent(event);
        break;
      case State.GENERATING:
        this.handleGeneratingEvent(event);
        break;
    }
  }

  /** Handles transitions from IDLE state to other states.
  * @param event: a valid AppEvent model representing the new event
  */
  private handleIdleEvent(event: AppEvent) {
    switch (event.type) {
      case AppEventType.ONE_PERSON:
        this.changeState(State.ONE_PERSON);
        break;
      case AppEventType.MULTIPLE_PEOPLE:
        this.changeState(State.MULTIPLE_PEOPLE);
        break;
    }
  }

  /** Handles transitions from ONE_PERSON state to other states.
  * @param event: a valid AppEvent model representing the new event
  */
  private handleOnePersonEvent(event: AppEvent) {
    /** 
     * The application should transition to MULTIPLE_PEOPLE before going to TWO_PEOPLE_WAVING, so
     * there should be no state change from ONE_PERSON directly to TWO_PEOPLE_WAVING.
    */
    switch (event.type) {
      case AppEventType.MULTIPLE_PEOPLE:
        this.changeState(State.MULTIPLE_PEOPLE);
        break;
      case AppEventType.ONE_WAVE_DETECTED:
        this.changeState(State.ONE_PERSON_WAVING);
        break;
      case AppEventType.NOBODY:
        this.changeState(State.IDLE);
        break;
    }
  }

  /** Handles transitions from MULTIPLE_PEOPLE state to other states.
  * @param event: a valid AppEvent model representing the new event
  */
  private handleMultiplePeopleEvent(event: AppEvent) {
    switch (event.type) {
      case AppEventType.ONE_PERSON:
        this.changeState(State.ONE_PERSON);
        break;
      case AppEventType.ONE_WAVE_DETECTED:
        this.changeState(State.ONE_PERSON_WAVING);
        break;
      case AppEventType.TWO_WAVES_DETECTED:
        this.changeState(State.GENERATING);
        break;
      case AppEventType.NOBODY:
        this.changeState(State.IDLE);
        break;
    }
  }

  /** Handles transitions from ONE_PERSON_WAVING state to other states.
  * @param event: a valid AppEvent model representing the new event
  */
  private handleOneWavingEvent(event: AppEvent) {
    /** 
     * The application should transition to MULTIPLE_PEOPLE before going to TWO_PEOPLE_WAVING, so
     * there should be no state change from ONE_PERSON_WAVING directly to TWO_PEOPLE_WAVING.
    */
    switch (event.type) {
      case AppEventType.ONE_PERSON:
        this.changeState(State.ONE_PERSON);
        break;
      case AppEventType.MULTIPLE_PEOPLE:
        this.changeState(State.MULTIPLE_PEOPLE);
        break;
      case AppEventType.TWO_WAVES_DETECTED:
        this.changeState(State.GENERATING);
        break;
      case AppEventType.NOBODY:
        this.changeState(State.IDLE);
        break;
    }
  }

  /** Handles transitions from GENERATING state to other states.
  * @param event: a valid AppEvent model representing the new event
  */
  private handleGeneratingEvent(event: AppEvent) {
    /** 
     * The application should stay in the GENERATING state until the generation is complete.
     * Once generation is complete, switch to PRESENTING state and handle that. 
     * Other events should not result in a state change.
    */
    if (event.type === AppEventType.GENERATION_COMPLETED) {
        this.changeState(State.PRESENTING);
        this.handlePresentingEvent();
    }
  }

  /** Handles transitions from PRESENTING state to other states. */
  private async handlePresentingEvent() {
    /** 
     * The application should stay in the PRESENTING state for 15 seconds before switching to IDLE.
     * This allows the image to be displayed before resetting the application state.
    */
    setTimeout(() => {
      this.changeState(State.IDLE);
    }, 15000);
  }



}
