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
        break;
      case State.MULTIPLE_PEOPLE:
        break;
      case State.ONE_PERSON_WAVING:
        break;
      case State.TWO_PEOPLE_WAVING:
        break;
      case State.GENERATING:
        break;
      case State.PRESENTING:
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


}
