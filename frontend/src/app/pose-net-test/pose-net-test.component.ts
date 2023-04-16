import { Component } from '@angular/core';

import { PoseEstimationService } from '../pose-estimation.service';

import * as poseDetection from '@tensorflow-models/pose-detection'
import { Observable } from 'rxjs';
import { AppEvent, AppEventsService } from '../app-events.service';

@Component({
  selector: 'app-pose-net-test',
  templateUrl: './pose-net-test.component.html',
  styleUrls: ['./pose-net-test.component.css']
})
export class PoseNetTestComponent {

  poses$: Observable<poseDetection.Pose[]>;
  events$: Observable<AppEvent>;

  constructor(private poseEstimation: PoseEstimationService, private appEvents: AppEventsService) {
    this.poses$ = poseEstimation.poses$;
    this.events$ = appEvents.events$;
  }

}
