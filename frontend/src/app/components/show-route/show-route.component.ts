import { Component, OnInit, ViewChild } from '@angular/core';
import {RouteUIComponent} from '../route-ui/route-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import { ActivatedRoute } from '@angular/router';
import {RouteService} from '../../routes/route.service';
import {RatingAggregation} from '../../commons/models/rateable';
import {UserSignature} from '../../user-data/user-data.model';
import {UserDataService} from '../../user-data/user-data.service';

@Component({
  selector: 'app-show-route',
  templateUrl: './show-route.component.html',
  styleUrls: ['./show-route.component.css']
})
export class ShowRouteComponent implements OnInit {

  mapComp: RouteUIComponent;
  frbs_route: FirebaseItem<Route>;
  sub: any;

  constructor(private route: ActivatedRoute, private routeService: RouteService, private userDataService: UserDataService) {
    this.frbs_route = new FirebaseItem(
      '0',
      new Route([], '', '', 1, new UserSignature('0', 'Dummy'), [], [], new RatingAggregation(0, 0, 0), [], 0, true)
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

  saveRoute = () => {
    if (this.userDataService.currentUserData &&
      this.frbs_route.item.userSignature.id === this.userDataService.currentUserData.userSignature.id) {
      this.routeService.update(this.frbs_route);
    }
  }
}
