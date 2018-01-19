import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {File} from '../../files/file.model';

@Component({
  selector: 'app-media-dialog',
  templateUrl: './media-dialog.component.html',
  styleUrls: ['./media-dialog.component.css']
})
export class MediaDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public file: File) {}
}
