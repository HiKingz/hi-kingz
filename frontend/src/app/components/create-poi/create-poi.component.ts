import { Component, OnInit, ViewChild } from '@angular/core';
import {PoiUIComponent} from '../poi-ui/poi-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Poi} from '../../pois/poi.model';
import {Point} from '../../coordinates/point.model';
import {Waypoint} from '../../coordinates/waypoint.model';
import {Rating} from '../../ratings/rating.model';
import {File} from '../../files/file.model';

@Component({
  selector: 'app-create-poi',
  templateUrl: './create-poi.component.html',
  styleUrls: ['./create-poi.component.css']
})
export class CreatePoiComponent implements OnInit {

  mapComp: PoiUIComponent;
  frbs_poi: FirebaseItem<Poi>;


  constructor() {
    this.frbs_poi = new FirebaseItem(
      '0',
      new Poi(<[Rating]>[], <[File]>[], null, null, null, new Point(0, 0))
    );
  }

  @ViewChild(PoiUIComponent)
  set appMap(comp: PoiUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
  }

  saveRoute = () => {
    // TODO
  }
}
