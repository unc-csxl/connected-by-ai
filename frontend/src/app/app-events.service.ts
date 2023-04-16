import { Injectable, OnDestroy } from '@angular/core';
import { PoseEstimationService } from './pose-estimation.service';
import * as poseDetection from '@tensorflow-models/pose-detection'
import { Observable, Subject, Subscription, distinctUntilChanged } from 'rxjs';

export enum AppEventType {
  NOBODY = "NOBODY",
  ONE_PERSON = "ONE_PERSON",
  MULTIPLE_PEOPLE = "MULTIPLE_PEOPLE",
  ONE_WAVE_DETECTED = "ONE_WAVE_DETECTED",
  TWO_WAVES_DETECTED = "TWO_WAVES_DETECTED",
  GENERATION_COMPLETED = "GENERATION_COMPLETED"
}

export interface AppEvent {
  type: AppEventType;
}

@Injectable({
  providedIn: 'root'
})
export class AppEventsService implements OnDestroy {

  poseSubscription: Subscription;

  poseBufferFilled: boolean = false;
  poseBufferIndex: number = 0;
  poseBuffer: poseDetection.Pose[][] = new Array(4);

  private events: Subject<AppEvent> = new Subject();
  public events$: Observable<AppEvent> = this.events.asObservable().pipe(distinctUntilChanged((prev, curr) => prev.type === curr.type));

  constructor(poseEstimation: PoseEstimationService) {
    this.poseSubscription = poseEstimation.poses$.subscribe((poses) => this.process(poses));
  }

  private process(poses: poseDetection.Pose[]): void {
    // Here we focus on filling the pose detection buffer before continuing on
    this.poseBufferIndex = (this.poseBufferIndex + 1);
    if (!this.poseBufferFilled) {
      if (this.poseBufferIndex >= this.poseBuffer.length) {
        this.poseBufferFilled = true;
      } else {
        this.poseBuffer[this.poseBufferIndex] = poses;
        return;
      }
    }
    this.poseBufferIndex %= this.poseBuffer.length;
    this.poseBuffer[this.poseBufferIndex] = poses;

    // TODO
    let sumPosesDetected = 0;
    for (let i = 0; i < this.poseBuffer.length; i++) {
      // Start with index just after pose buffer
      let index = (this.poseBufferIndex + 1 + i) % this.poseBuffer.length;
      let poses = this.poseBuffer[index];
      sumPosesDetected += poses.length;
    }
    let meanPosesDetected = Math.round(sumPosesDetected / this.poseBuffer.length);
    if (meanPosesDetected == 0) {
      this.events.next({type: AppEventType.NOBODY});
    } else if (meanPosesDetected == 1) {
      this.events.next({type: AppEventType.ONE_PERSON});
    } else {
      this.events.next({type: AppEventType.MULTIPLE_PEOPLE});
    }
  }

  ngOnDestroy(): void {
    this.poseSubscription.unsubscribe();
  }

}
