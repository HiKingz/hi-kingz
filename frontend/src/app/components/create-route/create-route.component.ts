import { Component, OnInit, ViewChild } from '@angular/core';
import {RouteUIComponent} from '../route-ui/route-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import {RouteService} from '../../routes/route.service';
import {UserDataService} from '../../user-data/user-data.service';
import {RatingAggregation} from '../../commons/models/rateable';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent {

  mapComp: RouteUIComponent;
  frbs_route: FirebaseItem<Route>;

  constructor(private routeService: RouteService, private userDataService: UserDataService) {
    this.frbs_route = new FirebaseItem(
      '0',
      new Route([], '', '', 1, null, [], [], new RatingAggregation(2.5, 0, 0), true, false)
    );
  }

  @ViewChild(RouteUIComponent)
  set appMap(comp: RouteUIComponent) {
    this.mapComp = comp;
  }

  saveRoute = () => {
    const self = this;
    if (this.userDataService.currentUserData) {
      this.frbs_route.item.userSignature = this.userDataService.currentUserData.userSignature;
      if (this.frbs_route.id === '0') {
        this.routeService.create(this.frbs_route.item).then((rt) => {
          rt.subscribe((new_rt) => {
            self.frbs_route = new_rt;
          });
        });
      } else {
        this.routeService.update(this.frbs_route);
      }
    }
  }
}
