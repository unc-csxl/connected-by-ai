import { Component, OnInit } from '@angular/core';
import { MockAppEventsService } from '../mock-app-events.service';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { AppEvent, AppEventType } from '../app-events.service';

enum State {
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
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  events$: Observable<AppEvent>;
  eventsSubscription!: Subscription;

  private currentState: State = State.IDLE;
  private state: Subject<State> = new BehaviorSubject<State>(this.currentState);
  state$: Observable<State> = this.state.asObservable();

  constructor(eventsService: MockAppEventsService) {
    this.events$ = eventsService.events$;
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events$.subscribe((event) => this.onEvent(event));
  }

  private changeState(state: State) {
    this.currentState = state;
    this.state.next(state);
  }

  private onEvent(event: AppEvent) {
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
      case State.TWO_PEOPLE_WAVING:
        this.handleTwoWavingEvent(event);
        break;
      case State.GENERATING:
        this.handleGeneratingEvent(event);
        break;
      case State.PRESENTING:
        this.handlePresentingEvent();
        break;
    }
  }

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

  private handleOnePersonEvent(event: AppEvent) {
    switch (event.type) {
      case AppEventType.MULTIPLE_PEOPLE:
        this.changeState(State.MULTIPLE_PEOPLE);
        break;
      case AppEventType.ONE_WAVE_DETECTED:
        this.changeState(State.ONE_PERSON_WAVING);
        break;
    }
  }

  private handleMultiplePeopleEvent(event: AppEvent) {
    switch (event.type) {
      case AppEventType.ONE_PERSON:
        this.changeState(State.ONE_PERSON);
        break;
      case AppEventType.ONE_WAVE_DETECTED:
        this.changeState(State.ONE_PERSON_WAVING);
        break;
      case AppEventType.TWO_WAVES_DETECTED:
        this.changeState(State.TWO_PEOPLE_WAVING);
        break;
      case AppEventType.NOBODY:
        this.changeState(State.IDLE);
        break;
    }
  }

  private handleOneWavingEvent(event: AppEvent) {
    switch (event.type) {
      case AppEventType.ONE_PERSON:
        this.changeState(State.ONE_PERSON);
        break;
      case AppEventType.MULTIPLE_PEOPLE:
        this.changeState(State.MULTIPLE_PEOPLE);
        break;
    }
  }

  private handleTwoWavingEvent(event: AppEvent) {
    switch (event.type) {
      case AppEventType.ONE_PERSON:
        this.changeState(State.ONE_PERSON);
        break;
      case AppEventType.MULTIPLE_PEOPLE:
        this.changeState(State.MULTIPLE_PEOPLE);
        break;
      case AppEventType.ONE_WAVE_DETECTED:
        this.changeState(State.ONE_PERSON_WAVING);
        break;
      case AppEventType.TWO_WAVES_DETECTED:
        this.changeState(State.TWO_PEOPLE_WAVING);
        break;
      case AppEventType.NOBODY:
        this.changeState(State.IDLE);
        break;
    }
  }

  private handleGeneratingEvent(event: AppEvent) {
    switch (event.type) {
      case AppEventType.GENERATION_COMPLETED:
        this.changeState(State.PRESENTING);
        break;
    }
  }

  private async handlePresentingEvent() {
    await new Promise(r => setTimeout(r, 15000));
    this.changeState(State.IDLE);
  }



}
