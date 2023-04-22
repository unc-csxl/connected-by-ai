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
    this.events.emit({type});
  }

}
