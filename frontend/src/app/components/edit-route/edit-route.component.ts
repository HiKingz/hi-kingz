import { Component, OnInit, ViewChild} from '@angular/core';
import {MapUIComponent} from '../map-ui/map-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import {Point} from '../../coordinates/point.model';
import {Waypoint} from '../../coordinates/waypoint.model';
import {ActivatedRoute} from '@angular/router';
import {UserSignature} from '../../users/user.model';

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
      new Route(
        null,
        null,
        null,
        null,
        null,
        [],
        [],
        null,
        null,
        null
      )
    );
  }

  @ViewChild(MapUIComponent)
  set appMap(comp: MapUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.frbs_route.reference= params['id'];
      // TODO: Load new route from DB
      // For now, create a dummy route
      this.frbs_route.item = new Route(
        null,
        'Testroute',
        'Eine Dummyroute ohne Datenbank dahinter.',
        3,
        new UserSignature('1337', 'Der Geister der vergangenen Weihnacht'),
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

  saveRoute = () => {
    // TODO: Save route
  }
}
