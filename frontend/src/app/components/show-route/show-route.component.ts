import { Component, OnInit, ViewChild } from '@angular/core';
import {RouteUIComponent} from '../route-ui/route-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import {Point} from '../../coordinates/point.model';
import {UserSignature} from '../../user-data/user-data.model';
import {Waypoint} from '../../coordinates/waypoint.model';
import { ActivatedRoute } from '@angular/router';
import {RouteService} from '../../routes/route.service';

@Component({
  selector: 'app-show-route',
  templateUrl: './show-route.component.html',
  styleUrls: ['./show-route.component.css']
})
export class ShowRouteComponent implements OnInit {

  mapComp: RouteUIComponent;
  frbs_route: FirebaseItem<Route>;
  sub: any;

  constructor(private route: ActivatedRoute, private routeService: RouteService) {
    this.frbs_route = new FirebaseItem(
      '0',
      new Route(null, null, null, null, null, [], [], null, [], 0, true)
    );
  }

  @ViewChild(RouteUIComponent)
  set appMap(comp: RouteUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.routeService.getById(params['id']).subscribe(new_rt => {
        this.frbs_route = new_rt;
        if (new_rt.item.waypoints.length > 0) {
          this.mapComp.flyTo(new_rt.item.waypoints[0].point);
        }
      });
    });
  }

}
