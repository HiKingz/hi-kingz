import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-difficulty-indicator',
  templateUrl: './difficulty-indicator.component.html',
  styleUrls: ['./difficulty-indicator.component.css']
})
export class DifficultyIndicatorComponent {
  @Input()
  public difficulty: number;

  @Input()
  public readOnly = true;

  constructor() {}
}
