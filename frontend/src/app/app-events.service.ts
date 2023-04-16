import { Injectable, OnDestroy } from '@angular/core';
import { PoseEstimationService } from './pose-estimation.service';
import * as poseDetection from '@tensorflow-models/pose-detection'
import { Observable, Subject, Subscription, distinctUntilChanged } from 'rxjs';

export enum AppEventType {
  NOBODY = "NOBODY",
  ONE_PERSON = "ONE_PERSON",
  MULTIPLE_PEOPLE = "MULTIPLE_PEOPLE",
  ONE_WAVE_DETECTED = "ONE_WAVE_DETECTED",
  TWO_WAVES_DETECTED = "TWO_WAVES_DETECTED"
}

export interface AppEvent {
  type: AppEventType;
}

@Injectable({
  providedIn: 'root'
})
export class AppEventsService implements OnDestroy {
  BUFFERSIZE: number = 4;

  poseSubscription: Subscription;

  poseBufferFilled: boolean = false;
  poseBufferIndex: number = 0;
  poseBuffer: poseDetection.Pose[][] = new Array(this.BUFFERSIZE);

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
    interface Frame {
      rwx: number;
      rwy: number;
      rsx: number;
      rsy: number;
      lwx: number;
      lwy: number;
      lsx: number;
      lsy: number;
    }

    let pplWave:Frame[][] = [];
    // loop through all poses to find max number of poses (later)
    for (let i = 0; i < 6; i ++) {
      pplWave.push([]);
    }

    for (let i = 0; i < this.poseBuffer.length; i++) {
      // Start with index just after pose buffer
      let index = (this.poseBufferIndex + 1 + i) % this.poseBuffer.length;
      let poses = this.poseBuffer[index];
      for (let x = 0; x < poses.length; x ++) {
        pplWave[x].push({
        "rwx": poses[x].keypoints[10].x, 
        "rwy": poses[x].keypoints[10].y, 
        "rsx": poses[x].keypoints[6].x, 
        "rsy": poses[x].keypoints[6].y, 
        "lwx": poses[x].keypoints[9].x, 
        "lwy": poses[x].keypoints[9].y, 
        "lsx": poses[x].keypoints[5].x, 
        "lsy": poses[x].keypoints[5].y
        })
      }
      sumPosesDetected += poses.length;
    }

    var sumPplWave:Frame[] = [];

    for (let person of pplWave) {
      let accFrame = {
        "rwx": 0, 
        "rwy": 0, 
        "rsx": 0, 
        "rsy": 0, 
        "lwx": 0, 
        "lwy": 0, 
        "lsx": 0, 
        "lsy": 0
        }

      for (let frame of person) {
        accFrame.rwx += frame.rwx;
        accFrame.rwy += frame.rwy;
        accFrame.rsx += frame.rsx;
        accFrame.rsy += frame.rsy;
        accFrame.lwx += frame.lwx;
        accFrame.lwy += frame.lwy;
        accFrame.lsx += frame.lsx;
        accFrame.lsy += frame.lsy;
      }
      sumPplWave.push(accFrame);
    }

    for (var i = 0; i < sumPplWave.length; i ++) {
      sumPplWave[i].rwx = sumPplWave[i].rwx / pplWave[i].length;
      sumPplWave[i].rwy = sumPplWave[i].rwy / pplWave[i].length;
      sumPplWave[i].rsx = sumPplWave[i].rsx / pplWave[i].length;
      sumPplWave[i].rsy = sumPplWave[i].rsy / pplWave[i].length;
      sumPplWave[i].lwx = sumPplWave[i].lwx / pplWave[i].length;
      sumPplWave[i].lwy = sumPplWave[i].lwy / pplWave[i].length;
      sumPplWave[i].lsx = sumPplWave[i].lsx / pplWave[i].length;
      sumPplWave[i].lsy = sumPplWave[i].lsy / pplWave[i].length;
    }

    let meanPosesDetected = Math.round(sumPosesDetected / this.poseBuffer.length);
    if (meanPosesDetected == 0) {
      this.events.next({type: AppEventType.NOBODY});
    } else if (meanPosesDetected == 1) {
      this.events.next({type: AppEventType.ONE_PERSON});
    } else {
      this.events.next({type: AppEventType.MULTIPLE_PEOPLE});
    }

    var counter = 0;

    for (let i = 0; i < sumPplWave.length; i ++) {
      if (sumPplWave[i].rwx < sumPplWave[i].rsx && sumPplWave[i].rwy < sumPplWave[i].rsy) {
        this.events.next({type: AppEventType.ONE_WAVE_DETECTED});
        counter ++;
      } else if (sumPplWave[i].lwx > sumPplWave[i].lsx && sumPplWave[i].lwy < sumPplWave[i].lsy) {
        this.events.next({type: AppEventType.ONE_WAVE_DETECTED});
        counter ++;
      }
    }

    if (counter > 1) {
      this.events.next({type: AppEventType.TWO_WAVES_DETECTED});
    }

  }

  ngOnDestroy(): void {
    this.poseSubscription.unsubscribe();
  }

}
