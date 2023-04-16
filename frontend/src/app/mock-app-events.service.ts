import { Injectable } from '@angular/core';

import { AppEventType, AppEvent } from './app-events.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockAppEventsService {

  private events: Subject<AppEvent> = new BehaviorSubject<AppEvent>({type: AppEventType.NOBODY});
  public events$: Observable<AppEvent> = this.events.asObservable();

  constructor() {}

  emit(event: AppEvent) {
    this.events.next(event);
  }

}
