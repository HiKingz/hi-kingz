import { Component, OnInit, ViewChild} from '@angular/core';
import {RouteUIComponent} from '../route-ui/route-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import {ActivatedRoute} from '@angular/router';
import {RouteService} from '../../routes/route.service';
import {UserDataService} from '../../user-data/user-data.service';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {

  mapComp: RouteUIComponent;
  frbs_route: FirebaseItem<Route>;
  sub: any;

  constructor(
    private route: ActivatedRoute, private routeService: RouteService, private userDataService: UserDataService
  ) {
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

  @ViewChild(RouteUIComponent)
  set appMap(comp: RouteUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
    const self = this;
    this.sub = this.route.params.subscribe(params => {
      self.routeService.getById(params['id']).subscribe(new_rt => {
        self.frbs_route = new_rt;
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
