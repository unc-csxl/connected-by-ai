import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, interval } from 'rxjs';

interface Txt2ImgResult {
  images: string[];
}

interface ExtraSingleImage {
  image: string;
}

interface ProgressResult {
  progress: number;
  state: {
    sampling_step: number;
    sampling_steps: number;
  };
  current_image: string | null;
}

type IdleState = {
  state: 'idle';
};

type GeneratingState = {
  state: 'generating';
  progress: number;
  step: number;
  steps: number;
  image: string | null;
};

type UpscalingState = {
  state: 'upscaling';
  image: string;
};

type CompleteState = {
  state: 'complete';
  image: string;
};

export type ArtGeneratorState =
  | IdleState
  | GeneratingState
  | UpscalingState
  | CompleteState;

@Injectable({
  providedIn: 'root'
})
export class ArtGeneratorService {

  private currentState: ArtGeneratorState = {state: 'idle'};
  private state: Subject<ArtGeneratorState> = new BehaviorSubject<ArtGeneratorState>(this.currentState);
  public state$: Observable<ArtGeneratorState> = this.state.asObservable();

  private currentArt: string[] = [];
  private art: Subject<string[]> = new BehaviorSubject<string[]>(this.currentArt);
  public art$: Observable<string[]> = this.art.asObservable();

  constructor(private httpClient: HttpClient) {}

  generate(prompt: string, negative_prompt: string): void {
    let steps = 30;
    this.updateState({state: 'generating', progress: 0.0, step: 0, steps: steps, image: null});

    let requestObservable = this.httpClient.post<Txt2ImgResult>('/sdapi/v1/txt2img', 
      { 
        "sd_model_checkpoint": "v2-1_768-ema-pruned.ckpt [ad2a33c361]",
        "sampler_name": "DDIM",
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "steps": steps,
        "width": 960,
        "height": 540,
        "cfg_scale": 8.0,
      }
    );

    const progressSubscription = interval(1000).subscribe(() => {
      this.httpClient.get<ProgressResult>('/sdapi/v1/progress', { params: {skip_current_image: false}})
        .subscribe((progress) => {
          if (progress.state.sampling_step > progress.state.sampling_steps) { progressSubscription.unsubscribe(); return; }
          this.updateState({
            state: 'generating',
            progress: progress.progress,
            step: progress.state.sampling_step,
            steps: progress.state.sampling_steps,
            image: progress.current_image
          });
        });
    });

    requestObservable.subscribe((result) => {
      this.updateState({state: 'generating', progress: 1.0, step: steps, steps, image: result.images[0]});
      this.upscale(result.images[0]);
    });
  }

  updateState(nextState: ArtGeneratorState) {
    this.currentState = nextState;
    this.state.next(this.currentState);
  }

  upscale(image: string): void {
    this.updateState({state: 'upscaling', image});

    this.httpClient.post<ExtraSingleImage>('/sdapi/v1/extra-single-image', {
      "upscaling_resize": 4,
      "upscaler_1": "R-ESRGAN 4x+",
      "upscaler_2": "ESRGAN_4x",
      "extras_upscaler_2_visibility": 0.5,
      "image": image
    }).subscribe((upscaled) => {
      this.updateState({state: 'complete', image: upscaled.image});
      this.currentArt.unshift(upscaled.image);
      if (this.currentArt.length > 10) {
        this.currentArt.pop();
      }
      this.art.next(this.currentArt);
    });
  }
  
}