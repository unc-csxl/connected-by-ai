import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ArtGeneratorService } from '../art-generator.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-art-test',
  templateUrl: './art-test.component.html',
  styleUrls: ['./art-test.component.css'],
  animations: [
    trigger('smoothEntrance', [
      transition(':enter', [style({ opacity: 0, zIndex: 1 }), animate("2000ms linear", style({ opacity: 1, zIndex: 1 }))]),
      transition(':leave', [style({ opacity: 1, zIndex: 20 }), animate("1000ms linear", style({ opacity: 0, zIndex: 20 }))]),
    ]),
  ]
})
export class ArtTestComponent implements AfterViewInit {

  @ViewChild('art') art!: ElementRef<HTMLImageElement>;

  constructor(public artGenerator: ArtGeneratorService) {
    // this.artGenerator.generate("well lit high resolution detailed dogwood trees in the spring morning sunshine in north carolina in the style of georges seurat impressionism detailed painting strokes", "wall hanging, frame, border, margin, low quality, signature, artist");
    // this.artGenerator.generate("well lit high resolution detailed dogwood trees and poplar trees in the spring morning sunshine with flowers in north carolina in the style of georges seurat impressionism detailed painting strokes", "wall hanging, frame, border, margin, low quality, signature, artist");

    let subjects = [
      "dorset horn sheep",
      "avacado toast still life",
      "roses",
      "panda bear",
      "vivid tulips",
      "magestic lion",
      "abstract shapes",
      "poplar trees in springtime",
      "butterfly on a flower",
      "fireflies on a summer evening",
      "milky way galaxy",
      "hummingbird portrait",
      "bonzai tree still life",
      "majestic waterfall vista",
      "united states national park",
      "coffee still life",
      "happy robot",
      "ocean waves",
      "foggy pond at sunrise",
      "lily pads",
      "toad",
      "vivid tie die",
      "peregrine falcon",
      "psychedelic rainbows",
      "neon lights",
      "abstract pattern circles",
      "geometric shapes",
      "futuristic city with green spaces",
      "fireworks",
    ];

    subjects = [
      "hummingbird",
      "dorset horned sheep",
      "peregrine falcon",
      "northern cardinal",
      "eastern box turtle",
      "eastern gray squirrel",
      "red-tailed hawk",
      "red-cockaded woodpecker",
      "american toad",
      "southern toad",
      "oak toad",
      "american beaver",
      "black bear",
      "bobcat",
      "eastern chipmunk",
      "white-tailed deer",
      "red fox",
      "groundhog",
      "virginia opossum",
      "eastern cottontail rabbit",
      "racoon",
      "eastern gray squirrel",
      "largemouth bass",
      "carolina wren",
      "carolina chickadee",
      "american goldfinch",
      "eastern bluebird",
      "american robin",
      "common snapping turtle",
      "painted turtle",
    ]

    let styles = [
      {
        medium: "oil painting",
        artists: ["georges seurat impressionism", "vincent van gogh", "michelangelo sistine", "jackson pollock", "georgia o'keefe", "Yayoi Kusama", "Bob Ross", "1840s realism", "picasso's cubism", "leng jun hyperrealistic"]
      },
      // {
      //   medium: "sketch",
      //   artists: ["graphite with realistic shading", "hiromu arakawa anime", "Adonna Khare pencil drawing", "Escher pencil drawing", "architectural drawing perspective", "frank lloyd wright", "disney pinnochio"]
      // },
      // {
      //   medium: "poster",
      //   artists: ["bauhaus color study screen print", "national parks vintage screen print"]
      // },
      // {
      //   medium: "mosaic",
      //   artists: ["gaudi", "laurel true"]
      // },
      // {
      //   medium: "mixed media collage",
      //   artists: ["clippings fabric marker 3D depth"]
      // }
    ];

    let stylePermutations = styles.flatMap((style) => style.artists.map(artist => `${style.medium} in the style of ${artist}`));

    let subject = subjects[Math.floor(Math.random() * subjects.length)];
    let style = stylePermutations[Math.floor(Math.random() * stylePermutations.length)];
    let prompt = `portrait of a ((${subject})) in North Carolina (${style}) that is high quality, detailed, bright, colorful, happy, inspiring`;
    this.artGenerator.generate(prompt, `people frame wall gallery canvas low quality hands nsfw x-rated signature artist letters text margin border book pencils gore blood hunting death`);
    console.log(prompt);
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
