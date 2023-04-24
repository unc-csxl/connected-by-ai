import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ArtGeneratorService } from 'src/app/art-generator.service';

@Component({
  selector: 'app-generating-art',
  templateUrl: './generating-art.component.html',
  styleUrls: ['./generating-art.component.css'],
  animations: [
    trigger('smoothEntrance', [
      transition(':enter', [style({opacity: 0, zIndex: 1}), animate("2000ms linear", style({opacity: 1, zIndex: 1}))]),
      transition(':leave', [style({opacity: 1, zIndex: 20}), animate("1000ms linear", style({opacity: 0, zIndex: 20}))]),
    ]),
  ]
})
export class GeneratingArtComponent {

  public constructor(public artGenerator: ArtGeneratorService) {
    this.artGenerator.generate("highly detailed, realistic still life oil painting of sunflowers in the style of vincent van gogh with heavy brush strokes", "wall hanging frame border margin fake unrealistic low quality");
  }

}
