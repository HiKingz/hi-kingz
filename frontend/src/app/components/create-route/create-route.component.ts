import { Component, OnInit, ViewChild } from '@angular/core';
import {RouteUIComponent} from '../route-ui/route-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import {RouteService} from '../../routes/route.service';
import {UserDataService} from '../../user-data/user-data.service';
import {RatingAggregation} from '../../commons/models/rateable';
import {UserSignature} from '../../user-data/user-data.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  mapComp: RouteUIComponent;
  frbs_route: FirebaseItem<Route>;

  constructor(private routeService: RouteService, private userDataService: UserDataService, private location: Location) {
    this.frbs_route = new FirebaseItem(
      '0',
      new Route([], '', '', 1, null, [], [], new RatingAggregation(0, 0, 0), [], 0, true)
    );
  }

  @ViewChild(RouteUIComponent)
  set appMap(comp: RouteUIComponent) {
    this.mapComp = comp;
  }

  public ngOnInit() {
    this.frbs_route.item.userSignature =
      (this.userDataService.currentUserData ? this.userDataService.currentUserData.userSignature : new UserSignature('0', 'Dummy'));
    this.userDataService.onCurrentUserDataUpdated.subscribe((userData) => {
      this.frbs_route.item.userSignature = userData ? userData.userSignature : new UserSignature('0', 'Dummy');
    });
  }

  saveRoute = () => {
    const self = this;
    if (this.userDataService.currentUserData) {
      this.frbs_route.item.userSignature = this.userDataService.currentUserData.userSignature;
      if (this.frbs_route.id === '0') {
        this.routeService.create(this.frbs_route.item).then((rt) => {
          rt.subscribe((new_rt) => {
            self.frbs_route = new_rt;
            self.location.go('routes/' + new_rt.id);
          });
        });
      } else {
        this.routeService.update(this.frbs_route);
      }
    }
  }
}
