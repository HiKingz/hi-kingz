import { Component, OnInit, ViewEncapsulation, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import {MapComponent} from '../map/map.component';
import {Poi} from '../../pois/poi.model';

@Component({
  selector: 'app-poi-ui',
  templateUrl: './poi-ui.component.html',
  styleUrls: ['./poi-ui.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PoiUIComponent implements OnInit {

  mapComp: MapComponent;

  @Input() poi: Poi;
  @Input() readonly: boolean;
  @Output() pointSaved = new EventEmitter();

  @ViewChild(MapComponent)
  set appMap(comp: MapComponent) {
    this.mapComp = comp;
  }

  constructor() { }

  ngOnInit() {
  }

}
