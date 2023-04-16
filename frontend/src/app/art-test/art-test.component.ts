import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ArtGeneratorService } from '../art-generator.service';

@Component({
  selector: 'app-art-test',
  templateUrl: './art-test.component.html',
  styleUrls: ['./art-test.component.css']
})
export class ArtTestComponent implements AfterViewInit {

  @ViewChild('art') art!: ElementRef<HTMLImageElement>;

  constructor(private artGenerator: ArtGeneratorService) {
  }

  ngAfterViewInit(): void {
    // this.artGenerator.generate("painting on a spring day highly detailed north carolina woods sun shining through blue skies detailed realism paint strokes", "wall hanging frame border margin fake unrealistic low quality").subscribe((result) => {
    this.artGenerator.generate("dogwood flowers painting spring sunshine bright happy detailed floral", "wall hanging frame border margin fake unrealistic low quality crayon marker child kids").subscribe((result) => {
      this.artGenerator.scale(result.images[0]).subscribe((result) => {
        this.art.nativeElement.src = `data:img/png;base64,${result.image}`
      });
    });  
  }

}
