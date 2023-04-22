import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { State } from '../../user-interface/user-interface.component';

@Component({
  selector: 'app-one-person-message',
  templateUrl: './one-person-message.component.html',
  styleUrls: ['./one-person-message.component.css']
})
export class OnePersonMessageComponent implements OnChanges {

  State = State;

  @Input('state')
  state!: State;

  ngOnChanges(): void {}

}
