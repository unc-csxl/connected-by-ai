import { Injectable } from '@angular/core';

import { AppEventType, AppEvent, IAppEventsService } from './app-events.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockAppEventsService implements IAppEventsService {

  private events: Subject<AppEvent> = new BehaviorSubject<AppEvent>({type: AppEventType.NOBODY});
  public events$: Observable<AppEvent> = this.events.asObservable();

  generateArt(): void {
    // TODO
  }

  ngOnDestroy(): void {
    // noop
  }

  emit(event: AppEvent) {
    this.events.next(event);
  }

}
