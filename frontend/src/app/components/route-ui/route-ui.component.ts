import {Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter, Inject} from '@angular/core';
import {Route} from '../../routes/route.model';

import {MapComponent} from '../map/map.component';
import {MatSelect, MatDialog} from '@angular/material';
import {Point} from '../../coordinates/point.model';
import {MediaDialogComponent} from '../media-dialog/media-dialog.component';

@Component({
  selector: 'app-route-ui',
  templateUrl: './route-ui.component.html',
  styleUrls: ['./route-ui.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RouteUIComponent implements OnInit {

  mapComp: MapComponent;

  select: MatSelect;

  @Input() route: Route;
  @Input() readonly: boolean;
  @Output() routeSaved = new EventEmitter();

  route_public: boolean;
  route_public_label: string;

  constructor(public dialog: MatDialog) {
    this.route_public = true;
    this.route_public_label = 'Öffentliche Route';
    // this._route = new Route(null, null, null, null, null, null, <[Waypoint]>[], new Direction(<[Point]>[]), null, null);
  }

  ngOnInit() {
  }

  @ViewChild(MapComponent)
  set appMap(comp: MapComponent) {
    this.mapComp = comp;
  }

  @ViewChild(MatSelect)
  set appSelect(comp: MatSelect) {
    this.select = comp;
  }

  changePrivacy = () => {
    if (this.route_public) {
      this.route_public_label = 'Öffentliche Route';
    } else {
      this.route_public_label = 'Private Route';
    }
  }

  // Center the map on the 'i'th waypoint in the _route
  public centerOn = (i: number) => {
    this.mapComp.flyTo(this.route.waypoints[i].point);
  }

  saveRoute = () => {
    this.routeSaved.emit();
  }

  public flyTo(location: Point) {
    this.mapComp.flyTo(location);
  }

  public fileChanged() {

  }

  public showImage(index: number) {
    this.dialog.open(MediaDialogComponent, {
      height: '550px',
      width: '500px',
      data: {
        source: this.route.files[index].url
      }
    });
  }
}
