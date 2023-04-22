import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { State } from '../../user-interface/user-interface.component';
import { ArtGeneratorService } from 'src/app/art-generator.service';
import { Observable, distinctUntilChanged, filter, interval, map, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-one-person-message',
  templateUrl: './one-person-message.component.html',
  styleUrls: ['./one-person-message.component.css']
})
export class OnePersonMessageComponent implements OnChanges {

  State = State;

  @Input('state')
  state!: State;

  imageIndex$: Observable<number>;

  ngOnChanges(): void {}

  constructor(public artGenerator: ArtGeneratorService) {
    this.imageIndex$ = artGenerator.art$
      .pipe(
        filter(images => images.length > 0),
        mergeMap(images => interval(10000).pipe(map((index) => (index % images.length) + 1))),
        distinctUntilChanged(),
      );
  }

}
