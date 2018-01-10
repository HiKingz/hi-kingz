import { Component, ViewChild } from '@angular/core';
import {PoiUIComponent} from '../poi-ui/poi-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Poi} from '../../pois/poi.model';
import {Point} from '../../coordinates/point.model';
import {UserDataService} from '../../user-data/user-data.service';
import {PoiService} from '../../pois/poi.service';
import {RatingAggregation} from '../../commons/models/rateable';

@Component({
  selector: 'app-create-poi',
  templateUrl: './create-poi.component.html',
  styleUrls: ['./create-poi.component.css']
})
export class CreatePoiComponent {

  mapComp: PoiUIComponent;
  frbs_poi: FirebaseItem<Poi>;

  constructor(private poiService: PoiService, private userDataService: UserDataService) {
    this.frbs_poi = new FirebaseItem(
      '0',
      new Poi([], null, null, null, new RatingAggregation(0, 0, 0), new Point(8.24958214937908, 50.08016862900732))
    );
  }

  @ViewChild(PoiUIComponent)
  set appMap(comp: PoiUIComponent) {
    this.mapComp = comp;
  }

  savePoint = () => {
    const self = this;
    if (this.userDataService.currentUserData) {
      this.frbs_poi.item.userSignature = this.userDataService.currentUserData.userSignature;
      if (this.frbs_poi.id === '0') {
        this.poiService.create(this.frbs_poi.item).then((rt) => {
          rt.subscribe((new_poi) => {
            self.frbs_poi = new_poi;
          });
        });
      } else {
        this.poiService.update(this.frbs_poi);
      }
    }
  }
}
