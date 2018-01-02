import { Component, OnInit, ViewChild } from '@angular/core';
import {MapUIComponent} from '../map-ui/map-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  mapComp: MapUIComponent;
  frbs_route: FirebaseItem<Route>;


  constructor() {
    this.frbs_route = new FirebaseItem(
      '0',
      new Route(null, null, null, null, null, null, null, null, null, null)
    );
  }

  @ViewChild(MapUIComponent)
  set appMap(comp: MapUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
  }

  saveRoute = () => {
    // TODO: Save route
  }
}
