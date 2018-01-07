import { Component, OnInit, ViewChild } from '@angular/core';
import {PoiUIComponent} from '../poi-ui/poi-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Poi} from '../../pois/poi.model';
import {Point} from '../../coordinates/point.model';
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
      new Poi(<[File]>[], null, null, null, 0, new Point(8.24958214937908, 50.08016862900732))
    );
  }

  @ViewChild(PoiUIComponent)
  set appMap(comp: PoiUIComponent) {
    this.mapComp = comp;
  }

  ngOnInit() {
  }

  savePoint = () => {
    // TODO
  }
}
