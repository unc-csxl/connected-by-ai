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
        artists: ["georges seurat impressionism", "vincent van gogh", "michelangelo sistine", "jackson pollock", "georgia o'keefe", "Yayoi Kusama", "Bob Ross", "1840s realism", "picasso's cubism"]
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

}
