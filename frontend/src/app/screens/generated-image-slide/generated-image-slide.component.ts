import { Component } from '@angular/core';
import { ArtGeneratorService } from 'src/app/art-generator.service';

@Component({
  selector: 'app-generated-image-slide',
  templateUrl: './generated-image-slide.component.html',
  styleUrls: ['./generated-image-slide.component.css']
})
export class GeneratedImageSlideComponent {

  constructor(public artGenerator: ArtGeneratorService) {}

}
