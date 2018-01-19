import {Component, Input} from '@angular/core';
import {File} from '../../files/file.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input()
  public file: File;

  constructor() { }
}
