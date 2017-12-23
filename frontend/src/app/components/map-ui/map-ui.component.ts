import {Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Route} from '../../routes/route.model';
import {Direction} from '../../directions/direction.model';
import {Point} from '../../coordinates/point.model';
import {Waypoint} from '../../coordinates/waypoint.model';

import {MapComponent} from '../map/map.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-map-ui',
  templateUrl: './map-ui.component.html',
  styleUrls: ['./map-ui.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapUIComponent implements OnInit {

  mapComp: MapComponent;

  @Input() route: Route;
  @Input() readonly: boolean;
  @Output() routeSaved = new EventEmitter();

  route_public: boolean;
  route_public_label: string;

  constructor() {
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
}
