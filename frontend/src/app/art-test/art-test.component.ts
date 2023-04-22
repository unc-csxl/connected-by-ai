import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ArtGeneratorService } from '../art-generator.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-art-test',
  templateUrl: './art-test.component.html',
  styleUrls: ['./art-test.component.css'],
  animations: [
    trigger('smoothEntrance', [
      transition(':enter', [style({opacity: 0, zIndex: 1}), animate("2000ms linear", style({opacity: 1, zIndex: 1}))]),
      transition(':leave', [style({opacity: 1, zIndex: 20}), animate("1000ms linear", style({opacity: 0, zIndex: 20}))]),
    ]),
  ]
})
export class ArtTestComponent implements AfterViewInit {

  @ViewChild('art') art!: ElementRef<HTMLImageElement>;

  constructor(public artGenerator: ArtGeneratorService) {
    this.artGenerator.generate("well lit high resolution detailed dogwood trees in the spring morning sunshine in north carolina in the style of georges seurat impressionism detailed painting strokes", "wall hanging, frame, border, margin, low quality, signature, artist");
  }

  ngAfterViewInit(): void {
    // this.artGenerator.generate("portrait of a dog in the style of leonardo da vinci", "low quality frame framed wall").subscribe((result) => {
    // this.artGenerator.generate("painting on a spring day highly detailed north carolina woods sun shining through blue skies detailed realism paint strokes", "wall hanging frame border margin fake unrealistic low quality").subscribe((result) => {
    // this.artGenerator.generate(
    //   "north carolina forest with a babbling brook in the spring time at sunrise on a crisp bright morning in oil painting, modern heavy strokes thick paint realistic detailed lifelike hyperrealism light beams",
    //   "low quality amateur childish fake cheap ugly")
      // .subscribe((result) => {
    // this.artGenerator.generate("dogwood flowers painting spring sunshine bright happy detailed floral", "wall hanging frame border margin fake unrealistic low quality crayon marker child kids").subscribe((result) => {
    // Good: this.artGenerator.generate("a photograph of a serene, clear, calm, glassy lake in the woods on a bright, cheerful, foggy early spring morning 35mm professional photographer", "wall hanging frame border margin fake unrealistic low quality crayon marker child kids").subscribe((result) => {
    // Good: this.artGenerator.generate("spring flowers painting detailed bright floral in the style of georgia o'keeffe", "wall hanging frame border margin fake unrealistic low quality crayon marker child kids").subscribe((result) => {
    // Good: this.artGenerator.generate("spirals, curves, lines, and circles in the pencil sketch style of escher highly detailed shading", "wall hanging frame border margin fake unrealistic low quality crayon marker child kids").subscribe((result) => {
    // Pretty good: this.artGenerator.generate("symmetry negative space proportions abstract beauty vibrant simple modern", "low quality face person human people").subscribe((result) => {
    // Meh: this.artGenerator.generate("mural of robots in the age of ai in the style of Banksy", "low quality face person human people").subscribe((result) => {
    // OK: this.artGenerator.generate("abstract geometric shapes color study screen printed ink pattern in the style of bauhaus art", "wall hanging frame border margin fake unrealistic low quality crayon marker child kids").subscribe((result) => {
    // Pretty good: this.artGenerator.generate("architectural ink sketch of skyscraper detailed rendering graphite perspective blueprint green spaces", "wall hanging frame border margin fake unrealistic low quality wood table pencils markers").subscribe((result) => {
    // this.artGenerator.generate("highly detailed, realistic still life oil painting of sunflowers in the style of vincent van gogh with heavy brush strokes", "wall hanging frame border margin fake unrealistic low quality").subscribe((result) => {
    // REALLY good w/ 50: this.artGenerator.generate("highly detailed, realistic still life oil painting of sunflowers in the style of vincent van gogh with heavy brush strokes", "wall hanging frame border margin fake unrealistic low quality").subscribe((result) => {
    // this.artGenerator.generate("highly detailed, sharp, realistic oil painting of a powerful, gentle, happy ram in the style of vincent van gogh with heavy brush strokes and carolina blue colors", "wall hanging frame border margin fake unrealistic low quality").subscribe((result) => {
    // V GOOD w/ 35 this.artGenerator.generate("well lit high resolution dogwood trees in the spring morning sunshine in north carolina in the style of georges seurat neo impressionism chromo-luminarism detailed painting strokes", "wall hanging frame border margin fake low quality signature artist").subscribe((result) => {
    // this.artGenerator.generate("well lit high resolution detailed dogwood trees in the spring morning sunshine in north carolina in the style of georges seurat impressionism detailed painting strokes", "wall hanging, frame, border, margin, low quality, signature, artist").subscribe((result) => {
    //   this.artGenerator.scale(result.images[0]).subscribe((result) => {
    //     this.art.nativeElement.src = `data:img/png;base64,${result.image}`
    //   });
    // });  
  }

}
