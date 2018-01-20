import { Component, ViewChild } from '@angular/core';
import {RouteUIComponent} from '../route-ui/route-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import { ActivatedRoute } from '@angular/router';
import {RouteService} from '../../routes/route.service';
import {UserDataService} from '../../user-data/user-data.service';

@Component({
  selector: 'app-show-route',
  templateUrl: './show-route.component.html',
  styleUrls: ['./show-route.component.css']
})
export class ShowRouteComponent {

  mapComp: RouteUIComponent;
  frbs_route: FirebaseItem<Route>;

  constructor(private route: ActivatedRoute, private routeService: RouteService, private userDataService: UserDataService) {
    this.route.params.subscribe(params => {
      this.routeService.getById(params['id']).subscribe(new_rt => {
        this.frbs_route = new_rt;
        if (new_rt.item.waypoints.length > 0) {
          this.mapComp.flyTo(new_rt.item.waypoints[0].point);
        }
      });
    });
  }

  @ViewChild(RouteUIComponent)
  set appMap(comp: RouteUIComponent) {
    this.mapComp = comp;
  }

  saveRoute = () => {
    if (this.userDataService.currentUserData &&
      this.frbs_route.item.userSignature.id === this.userDataService.currentUserData.userSignature.id) {
      this.routeService.update(this.frbs_route);
    }
  }
}
