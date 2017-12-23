import { Component, OnInit, ViewChild} from '@angular/core';
import {MapUIComponent} from '../map-ui/map-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import {Direction} from '../../directions/direction.model';
import {Point} from '../../coordinates/point.model';
import {Waypoint} from '../../coordinates/waypoint.model';
import {User} from '../../users/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {

  mapComp: MapUIComponent;
  frbs_route: FirebaseItem<Route>;
  sub: any;

  constructor(private route: ActivatedRoute) {
    this.frbs_route = new FirebaseItem(
      '0',
      new Route(null, null, null, null, null, null, <[Waypoint]>[], new Direction(<[Point]>[]), null, null)
    );
  }

  @ViewChild(MapUIComponent)
  set appMap(comp: MapUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.frbs_route.id = params['id'];
      // TODO: Load new route from DB
      // For now, create a dummy route
      this.frbs_route.item = new Route(
        null,
        null,
        'Testroute',
        'Eine Dummyroute ohne Datenbank dahinter.',
        3,
        new User('1337', 'Der Geister der vergangenen Weihnacht'),
        <[Waypoint]>[
          new Waypoint('Wegpunkt 1', new Point(8, 50)),
          new Waypoint('Wegpunkt 2', new Point(8.001, 49.999)),
          new Waypoint('Wegpunkt 3', new Point(8.002, 49.9965)),
        ],
        new Direction(<[Point]>[
          new Point(8, 50),
          new Point(8.001, 49.999),
          new Point(8.002, 49.9965)
        ]),
        true,
        false);
    });
  }

  saveRoute = () => {
    // TODO: Save route
  }
}
