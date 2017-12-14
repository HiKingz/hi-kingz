import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Route} from '../../routes/route.model';
import {Direction} from '../../directions/direction.model';
import {Point} from '../../coordinates/point.model';



@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateRouteComponent implements OnInit {

  route: Route;
  route_name: string;
  route_description: string;
  route_difficulty: number;

  route_public: boolean;
  route_public_label: string;

  constructor() {
    this.route_public = true;
    this.route_public_label = 'Öffentliche Route';
    this.route = new Route(null, null, null, null, null, null, null, new Direction(<[Point]>[]), null, null);
  }

  ngOnInit() {
  }

  changePrivacy = () => {
    if (this.route_public) {
      this.route_public_label = 'Öffentliche Route';
    } else {
      this.route_public_label = 'Private Route';
    }
  }

  saveRoute = () => {
  }
}
