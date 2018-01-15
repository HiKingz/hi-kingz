import { Component, OnInit } from '@angular/core';
import {Route} from '../../routes/route.model';
import {Point} from '../../coordinates/point.model';
import {MediaDialogComponent} from '../media-dialog/media-dialog.component';
import {FileService} from '../../files/file.service';
import {File} from '../../files/file.model';

@Component({
  selector: 'app-meta-ui',
  templateUrl: './meta-ui.component.html',
  styleUrls: ['./meta-ui.component.css']
})
export class MetaUiComponent implements OnInit {

  route_public_label: string;

  constructor(private rdonly: boolean, private route: Route, private closeCallback: Function) {
    this.route_public_label = 'Öffentliche Route';
  }

  private fullStars(rating: number): Array<number> {
    const floored = Math.floor(rating);
    return Array(floored);
  }

  private emptyStars(rating: number): Array<number> {
    const ceiled = 5 - (Math.floor(rating) + (this.halfStar(rating) ? 1 : 0));
    return Array(ceiled);
  }

  private halfStar(rating: number): boolean {
    const decimals = rating - Math.floor(rating);
    return (decimals >= 0.25 && decimals <= 0.75);
  }

  changePrivacy() {
    if (this.route.isPublic) {
      this.route_public_label = 'Öffentliche Route';
    } else {
      this.route_public_label = 'Private Route';
    }
  }

  ngOnInit() {
  }

  closeUI() {
    this.closeCallback();
  }

}
