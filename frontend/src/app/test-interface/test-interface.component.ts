import { Component } from '@angular/core';
import { AppEventType } from '../app-events.service';
import { MockAppEventsService } from '../mock-app-events.service';
import testImage from "./generated-image";

@Component({
  selector: 'app-test-interface',
  templateUrl: './test-interface.component.html',
  styleUrls: ['./test-interface.component.css']
})
export class TestInterfaceComponent {

  AppEventType = AppEventType;

  constructor(private events: MockAppEventsService) {}
  
  event(type: AppEventType) {
    if (type == AppEventType.GENERATION_COMPLETED) {
      this.events.emit({type, data: testImage})
    } else {
      this.events.emit({type});
    }
  }

}
