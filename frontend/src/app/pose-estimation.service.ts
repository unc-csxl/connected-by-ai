import { Injectable } from '@angular/core';

/* Sample code inspired by https://github.com/tensorflow/tfjs-models/blob/master/pose-detection/demos/live_video/src/index.js */
import '@tensorflow/tfjs-backend-webgl';

import * as poseDetection from '@tensorflow-models/pose-detection'
import { BehaviorSubject, Observable, Subject, combineLatestWith, from, map } from 'rxjs';

const FRAMES_PER_SECOND_GOAL = 30;

const VIDEO_CONFIG = {
  'audio': false,
  'video': {
    facingMode: 'user',
    width: 720,
    height: 480,
    frameRate: {
      ideal: FRAMES_PER_SECOND_GOAL
    }
  }
};

const DETECTION_CONFIG: poseDetection.PosenetModelConfig = {
  inputResolution: { width: 720, height: 480 },
  // architecture: 'ResNet50',
  architecture: 'MobileNetV1',
  quantBytes: 4,
  outputStride: 16
};

@Injectable({
  providedIn: 'root'
})
export class PoseEstimationService {

  public video?: HTMLVideoElement;
  public detector?: poseDetection.PoseDetector;

  private poses: Subject<poseDetection.Pose[]> = new BehaviorSubject<poseDetection.Pose[]>([]);
  public poses$: Observable<poseDetection.Pose[]> = this.poses.asObservable();

  constructor() {
    this.initDetector().pipe(
      combineLatestWith(this.initVideo())
    ).subscribe(([detector, video]) => {
      this.detector = detector;
      this.video = video;
      document.body.appendChild(video);
      video.addEventListener('play', () => this.runDetection());
    });
  }

  private initVideo(): Observable<HTMLVideoElement> {
    return from(navigator.mediaDevices.getUserMedia(VIDEO_CONFIG))
      .pipe(
        map((stream) => {
          let video = window.document.createElement('video') as HTMLVideoElement;
          video.width = 720;
          video.height = 480;
          video.autoplay = true;
          video.srcObject = stream;
          video.style.position = "fixed";
          video.style.top = "0";
          video.style.right = "10";
          video.style.visibility = 'hidden';
          return video;
        })
      );
  }

  initDetector(): Observable<poseDetection.PoseDetector> {
    return from(poseDetection.createDetector(poseDetection.SupportedModels.PoseNet, DETECTION_CONFIG));
  }

  runDetection(): void {
    window.setTimeout(() => {
      let poses = this.detector!.estimatePoses(this.video!, {
        maxPoses: 5,
        flipHorizontal: false
      });
      from(poses).subscribe(poses => {
        let filteredPoses = poses.filter(pose => pose.score! > 0.35);
        this.poses.next(filteredPoses);
        this.runDetection();
      });
    }, 1000 / FRAMES_PER_SECOND_GOAL);
  }

}