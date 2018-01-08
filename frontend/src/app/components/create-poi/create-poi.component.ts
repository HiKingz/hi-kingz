import { Component, OnInit, ViewChild } from '@angular/core';
import {PoiUIComponent} from '../poi-ui/poi-ui.component';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Poi} from '../../pois/poi.model';
import {Point} from '../../coordinates/point.model';
import {File} from '../../files/file.model';
import {UserService} from '../../users/user.service';
import {User} from '../../users/user.model';
import {PoiService} from '../../pois/poi.service';

@Component({
  selector: 'app-create-poi',
  templateUrl: './create-poi.component.html',
  styleUrls: ['./create-poi.component.css']
})
export class CreatePoiComponent implements OnInit {

  mapComp: PoiUIComponent;
  frbs_poi: FirebaseItem<Poi>;
  currentUser: User;

  constructor(private poiService: PoiService, private userService: UserService) {
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
    const self = this;
    this.userService.getUser().subscribe((usr) => {
      self.currentUser = usr.item;
    });
  }

  savePoint = () => {
    const self = this;
    if (this.currentUser) {
      this.frbs_poi.item.user = this.currentUser;
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
