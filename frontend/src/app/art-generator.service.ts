import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtGeneratorService {

  constructor(private httpClient: HttpClient) {}

  generate(prompt: string, negative_prompt: string): Observable<any> {
    return this.httpClient.post<any>('/sdapi/v1/txt2img', 
      { 
        "sd_model_checkpoint": "v2-1_768-ema-pruned.ckpt [ad2a33c361]",
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "steps": 30,
        "width": 768,
        "height": 768, 
      }
    );
  }

  scale(data: string): Observable<any> {
    return this.httpClient.post<any>('/sdapi/v1/extra-single-image', {
      "upscaling_resize": 4,
      "upscaler_1": "ESRGAN_4x",
      "image": data
    });
  }
  
}