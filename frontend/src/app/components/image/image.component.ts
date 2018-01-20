import {Component, Input} from '@angular/core';
import {File} from '../../files/file.model';
import {MediaDialogComponent} from '../media-dialog/media-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input()
  public files: Array<File>;

  constructor(private _dialog: MatDialog) { }

  openMediaDialog(file) {
    this._dialog.open(MediaDialogComponent, {
      data: file
    });
  }
}
