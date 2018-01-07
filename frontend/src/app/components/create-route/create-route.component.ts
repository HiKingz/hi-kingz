import { Component, OnInit, ViewChild } from '@angular/core';
import {RouteUIComponent} from '../route-ui/route-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';
import {RouteService} from '../../routes/route.service';
import {UserService} from '../../users/user.service';
import {User} from '../../users/user.model';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  mapComp: RouteUIComponent;
  frbs_route: FirebaseItem<Route>;
  currentUser: User;

  constructor(private routeService: RouteService, private userService: UserService) {
    this.frbs_route = new FirebaseItem(
      '0',
      new Route([], null, null, 0, null, [], [], 0, true, false)
    );
  }

  @ViewChild(RouteUIComponent)
  set appMap(comp: RouteUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
    const self = this;
    this.userService.getUser().subscribe((usr) => {
      self.currentUser = usr.item;
    });
  }

  saveRoute = () => {
    const self = this;
    if (this.currentUser) {
      this.frbs_route.item.user = this.currentUser;
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
