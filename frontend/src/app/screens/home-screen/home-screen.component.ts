import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { State } from '../../user-interface/user-interface.component';
import { ArtGeneratorService } from 'src/app/art-generator.service';
import { Observable, concat, distinctUntilChanged, filter, map, mergeMap, of, shareReplay, tap, timeout, timer } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0, zIndex: 20 }), animate("2500ms ease-in", style({ opacity: 1, zIndex: 20 }))]),
      transition(':leave', [style({ opacity: 1, zIndex: 1 }), animate("2500ms ease-in", style({ opacity: 0, zIndex: 1 }))]),
    ]),
    trigger('fadeFast', [
      transition(':enter', [style({ opacity: 0, zIndex: 20 }), animate("200ms ease-in", style({ opacity: 1, zIndex: 20 }))]),
      transition(':leave', [style({ opacity: 1, zIndex: 1 }), animate("100ms ease-in", style({ opacity: 0, zIndex: 1 }))]),
    ]),
    trigger('fadeLogo', [
      transition(':enter', [style({ opacity: 0, zIndex: 200 }), animate("2500ms ease-in", style({ opacity: 1, zIndex: 200 }))]),
      transition(':leave', [style({ opacity: 1, zIndex: 200 }), animate("2500ms ease-in", style({ opacity: 0, zIndex: 200 }))]),
    ]),
  ]
})
export class HomeScreenComponent implements OnChanges {

  State = State;

  @Input('state')
  state!: State;

  imageIndex$: Observable<number>;
  showTitle$: Observable<boolean>;

  ngOnChanges(): void { }

  constructor(public artGenerator: ArtGeneratorService) {
    this.imageIndex$ = artGenerator.art$
      .pipe(
        filter(images => images.length > 0),
        mergeMap(images => timer(0, 30000).pipe(map((index) => (index % images.length) + 1))),
        distinctUntilChanged(),
      );

    this.showTitle$ = concat(of(false), timer(25000, 10000).pipe(map(this.counter()), shareReplay(1)));
  }

  private counter() {
    let counter = 0;
    return () => {
      counter += 1;
      return counter % 3 === 1;
    }
  }

}
