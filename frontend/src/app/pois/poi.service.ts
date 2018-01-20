import {Injectable} from '@angular/core';
import {Poi} from './poi.model';
import {FirestoreDataService} from '../commons/firestore-data-services';
import {Observable} from 'rxjs/Observable';
import {FirebaseItem} from '../commons/models/firebase.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {InstantSearchService} from '../instantsearch/instantsearch.service';

@Injectable()
export class PoiService extends FirestoreDataService<Poi> {
  protected readonly _collectionPath = 'pois';

  constructor(db: AngularFirestore, private _instantSearchService: InstantSearchService) {
    super(db);
  }

  public create(poi: Poi): Promise<Observable<FirebaseItem<Poi>>> {
    return this._create(poi);
  }

  public update(poi: FirebaseItem<Poi>): Promise<void> {
    return this._updateOrCreate(poi);
  }

  public getInArea(top: number, right: number, bottom: number, left: number): Promise<Array<FirebaseItem<Poi>>> {
    return this._instantSearchService.search('pois', {
      insideBoundingBox: [[top, right, bottom, left]]
    }).then(
      result => Promise.resolve(
        result.hits.map(
          hit => new FirebaseItem<Poi>('pois/' + hit.objectID, this._deserializeData(hit))
        )
      )
    );
  }

  protected _deserializeData(data: any): Poi {
    return Poi.deserialize(data);
  }
}
