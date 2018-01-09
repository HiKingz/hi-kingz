import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-media-dialog',
  templateUrl: './media-dialog.component.html',
  styleUrls: ['./media-dialog.component.css']
})
export class MediaDialogComponent implements OnInit {

  mediasource: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.mediasource = data.source;
  }

  ngOnInit() {
  }

}
