import { Component } from '@angular/core';
import { ArtGeneratorService } from 'src/app/art-generator.service';

@Component({
  selector: 'app-generating-art',
  templateUrl: './generating-art.component.html',
  styleUrls: ['./generating-art.component.css']
})
export class GeneratingArtComponent {

  public constructor(private artGenerator: ArtGeneratorService) {

  }

}
