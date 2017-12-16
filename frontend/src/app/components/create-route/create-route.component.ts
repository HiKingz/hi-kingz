import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {Route} from '../../routes/route.model';
import {Direction} from '../../directions/direction.model';
import {Point} from '../../coordinates/point.model';
import {Waypoint} from "../../coordinates/waypoint.model";

import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateRouteComponent implements OnInit {

  mapComp: MapComponent;

  route: Route;
  route_name: string;
  route_description: string;
  route_difficulty: number;

  route_public: boolean;
  route_public_label: string;

  constructor() {
    this.route_public = true;
    this.route_public_label = 'Öffentliche Route';
    this.route = new Route(null, null, null, null, null, null, <[Waypoint]>[], new Direction(<[Point]>[]), null, null);
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

  // Center the map on the 'i'th waypoint in the route
  public centerOn = (i: number) => {
    this.mapComp.flyTo(this.route.waypoints[i].point);
  }

  saveRoute = () => {
  }
}
