import { Injectable, OnDestroy } from '@angular/core';
import { PoseEstimationService } from './pose-estimation.service';
import * as poseDetection from '@tensorflow-models/pose-detection'
import { Observable, Subject, Subscription, distinctUntilChanged } from 'rxjs';
import { ArtGeneratorService, ArtGeneratorState } from './art-generator.service';

export enum AppEventType {
  NOBODY = "NOBODY",
  ONE_PERSON = "ONE_PERSON",
  MULTIPLE_PEOPLE = "MULTIPLE_PEOPLE",
  ONE_WAVE_DETECTED = "ONE_WAVE_DETECTED",
  TWO_WAVES_DETECTED = "TWO_WAVES_DETECTED",
  GENERATION_COMPLETED = "GENERATION_COMPLETED"
}

type NobodyEvent = {
  type: AppEventType.NOBODY;
};

type OnePersonEvent = {
  type: AppEventType.ONE_PERSON;
};

type MultiplePeopleEvent = {
  type: AppEventType.MULTIPLE_PEOPLE;
};

type OneWaveEvent = {
  type: AppEventType.ONE_WAVE_DETECTED;
};

type TwoWaveEvent = {
  type: AppEventType.TWO_WAVES_DETECTED;
  // TODO: Add bounding box images
};

type GenerationCompletedEvent = {
  type: AppEventType.GENERATION_COMPLETED;
}

export type AppEvent =
  | NobodyEvent
  | OnePersonEvent
  | MultiplePeopleEvent
  | OneWaveEvent
  | TwoWaveEvent
  | GenerationCompletedEvent;

export interface IAppEventsService extends OnDestroy {
  events$: Observable<AppEvent>;
}

@Injectable({
  providedIn: 'root'
})
export class AppEventsService implements IAppEventsService {
  BUFFERSIZE: number = 10;

  poseSubscription: Subscription;

  poseBufferFilled: boolean = false;
  poseBufferIndex: number = 0;
  poseBuffer: poseDetection.Pose[][] = new Array(this.BUFFERSIZE);

  private events: Subject<AppEvent> = new Subject();
  public events$: Observable<AppEvent> = this.events.asObservable().pipe(distinctUntilChanged((prev, curr) => prev.type === curr.type));
  artGenerationSubscription: Subscription;

  constructor(poseEstimation: PoseEstimationService, artGenerationService: ArtGeneratorService) {
    this.poseSubscription = poseEstimation.poses$.subscribe((poses) => this.processPose(poses));
    this.artGenerationSubscription = artGenerationService.state$.subscribe((state) => this.processArtGeneration(state));
  }

  private processArtGeneration(state: ArtGeneratorState) {
    if (state.state === 'complete') {
      this.events.next({
        type: AppEventType.GENERATION_COMPLETED,
      })
    }
  }

  private processPose(poses: poseDetection.Pose[]): void {
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

    // create interface for wrist/shoulder data points
    interface Frame {
      rightWristX: number;
      rightWristY: number;
      rightShoulderX: number;
      rightShoulderY: number;
      leftWristX: number;
      leftWristY: number;
      leftShoulderX: number;
      leftShoulderY: number;
    }

    let pplWave:Frame[][] = [];

    // if maxNumber of poses is increased, code might break; in that case add loop to find max number of poses (currently hardcoded)

    // build pplWave data structure [[{}]]
    for (let i = 0; i < 6; i ++) {
      pplWave.push([]);
    }

    for (let i = 0; i < this.poseBuffer.length; i++) {
      // Start with index just after pose buffer
      let index = (this.poseBufferIndex + 1 + i) % this.poseBuffer.length;
      let poses = this.poseBuffer[index];

      // pushes wrist, shoulder frames by person
      for (let x = 0; x < poses.length; x ++) {
        pplWave[x].push({
        "rightWristX": poses[x].keypoints[10].x, 
        "rightWristY": poses[x].keypoints[10].y, 
        "rightShoulderX": poses[x].keypoints[6].x, 
        "rightShoulderY": poses[x].keypoints[6].y, 
        "leftWristX": poses[x].keypoints[9].x, 
        "leftWristY": poses[x].keypoints[9].y, 
        "leftShoulderX": poses[x].keypoints[5].x, 
        "leftShoulderY": poses[x].keypoints[5].y
        })
      }
      sumPosesDetected += poses.length;
    }

    // initiate object to store sums
    var sumPplWave:Frame[] = [];

    // for loop to sum up wrist, shoulder data points
    for (let person of pplWave) {
      let accFrame = {
        "rightWristX": 0, 
        "rightWristY": 0, 
        "rightShoulderX": 0, 
        "rightShoulderY": 0, 
        "leftWristX": 0, 
        "leftWristY": 0, 
        "leftShoulderX": 0, 
        "leftShoulderY": 0
        }

      for (let frame of person) {
        accFrame.rightWristX += frame.rightWristX;
        accFrame.rightWristY += frame.rightWristY;
        accFrame.rightShoulderX += frame.rightShoulderX;
        accFrame.rightShoulderY += frame.rightShoulderY;
        accFrame.leftWristX += frame.leftWristX;
        accFrame.leftWristY += frame.leftWristY;
        accFrame.leftShoulderX += frame.leftShoulderX;
        accFrame.leftShoulderY += frame.leftShoulderY;
      }
      sumPplWave.push(accFrame);
    }

    // overwrite sums with averages
    for (var i = 0; i < sumPplWave.length; i ++) {
      sumPplWave[i].rightWristX = sumPplWave[i].rightWristX / pplWave[i].length;
      sumPplWave[i].rightWristY = sumPplWave[i].rightWristY / pplWave[i].length;
      sumPplWave[i].rightShoulderX = sumPplWave[i].rightShoulderX / pplWave[i].length;
      sumPplWave[i].rightShoulderY = sumPplWave[i].rightShoulderY / pplWave[i].length;
      sumPplWave[i].leftWristX = sumPplWave[i].leftWristX / pplWave[i].length;
      sumPplWave[i].leftWristY = sumPplWave[i].leftWristY / pplWave[i].length;
      sumPplWave[i].leftShoulderX = sumPplWave[i].leftShoulderX / pplWave[i].length;
      sumPplWave[i].leftShoulderY = sumPplWave[i].leftShoulderY / pplWave[i].length;
    }

    // detecting how many people
    let meanPosesDetected = Math.round(sumPosesDetected / this.poseBuffer.length);
    if (meanPosesDetected == 0) {
      this.events.next({type: AppEventType.NOBODY});
    } else if (meanPosesDetected == 1) {
      this.events.next({type: AppEventType.ONE_PERSON});
    } else {
      this.events.next({type: AppEventType.MULTIPLE_PEOPLE});
    }

    // counter to determine one/two waves
    var counter = 0;
    // for loop to check if people are waving
    for (let i = 0; i < sumPplWave.length; i ++) {
      if (sumPplWave[i].rightWristX < sumPplWave[i].rightShoulderX && sumPplWave[i].rightWristY < sumPplWave[i].rightShoulderY) {
        counter ++;
      } else if (sumPplWave[i].leftWristX > sumPplWave[i].leftShoulderX && sumPplWave[i].leftWristY < sumPplWave[i].leftShoulderY) {
        counter ++;
      }
    }

    // checks if people are waving
    if (counter > 1) {
      this.events.next({type: AppEventType.TWO_WAVES_DETECTED});
    } else if (counter > 0) {
      this.events.next({type: AppEventType.ONE_WAVE_DETECTED});
    }

  }

  ngOnDestroy(): void {
    this.poseSubscription.unsubscribe();
    this.artGenerationSubscription.unsubscribe();
  }

}
