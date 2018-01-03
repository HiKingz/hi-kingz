import { Component, OnInit, ViewChild } from '@angular/core';
import {PoiUIComponent} from '../poi-ui/poi-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Poi} from '../../pois/poi.model';
import {Point} from '../../coordinates/point.model';
import {File} from '../../files/file.model';
import {RatingAggregation} from '../../commons/models/rateable';

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
      new Poi(<[File]>[], null, null, null, new RatingAggregation(0,0), new Point(0, 0))
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
