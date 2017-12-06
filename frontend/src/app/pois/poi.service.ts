import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Poi} from "./poi.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PoiService {

  private poiCollection:AngularFirestoreCollection<Poi>;
  pois: Observable<Poi[]>;

  constructor(private afs:AngularFirestore) {
    this.poiCollection = afs.collection<Poi>('pois');
    this.pois = this.poiCollection.valueChanges();
  }

  addPoi(poi:Poi){
    this.poiCollection.add(poi);
  }

}
