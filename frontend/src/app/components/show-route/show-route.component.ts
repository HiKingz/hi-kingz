import { Component, OnInit, ViewChild } from '@angular/core';
import {RouteUIComponent} from '../route-ui/route-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import {Point} from '../../coordinates/point.model';
import {User} from '../../users/user.model';
import {Waypoint} from '../../coordinates/waypoint.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-route',
  templateUrl: './show-route.component.html',
  styleUrls: ['./show-route.component.css']
})
export class ShowRouteComponent implements OnInit {

  mapComp: RouteUIComponent;
  frbs_route: FirebaseItem<Route>;
  sub: any;

  constructor(private route: ActivatedRoute) {
    this.frbs_route = new FirebaseItem(
      '0',
      new Route(null, null, null, null, null, [], [], null, true, false)
    );
  }

  @ViewChild(RouteUIComponent)
  set appMap(comp: RouteUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.frbs_route.reference = params['id'];
      // TODO: Load new route from DB
      // For now, create a dummy route
      this.frbs_route.item = new Route(
        null,
        'Testroute',
        'Eine Dummyroute ohne Datenbank dahinter.',
        3,
        new User('1337', 'Der Geister der vergangenen Weihnacht'),
        [
          new Waypoint('Wegpunkt 1', new Point(8, 50)),
          new Waypoint('Wegpunkt 2', new Point(8.001, 49.999)),
          new Waypoint('Wegpunkt 3', new Point(8.002, 49.9965)),
        ],
        [
          new Point(8, 50),
          new Point(8.001, 49.999),
          new Point(8.002, 49.9965)
        ],
        null,
        true,
        false);
    });
  }

}
