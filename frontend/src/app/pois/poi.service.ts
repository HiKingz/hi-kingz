import { Injectable } from '@angular/core';
import {Poi} from './poi.model';
import {FirestoreDataService} from '../commons/firestore-data-services';
import {UserSignature} from '../users/user.model';
import {Point} from '../coordinates/point.model';
import {Observable} from 'rxjs/Observable';
import {FirebaseItem} from '../commons/models/firebase.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {RatingAggregation} from '../commons/models/rateable';

@Injectable()
export class PoiService extends FirestoreDataService<Poi> {
  protected readonly _collectionPath = 'pois';

  constructor(db: AngularFirestore) {
    super(db);
  }

  public create(poi: Poi): Promise<Observable<FirebaseItem<Poi>>> {
    return this._create(poi);
  }

  public update(poi: FirebaseItem<Poi>): Promise<void> {
    return this._updateOrCreate(poi);
  }

  public getInArea(top: number, right: number, bottom: number, left: number): Observable<Array<FirebaseItem<Poi>>> {
    // TODO
    return null;
  }

  protected _deserializeData(data: any): Poi {
    return new Poi(
      // TODO check if files need to be deserialized
      null,
      data.name || '',
      data.descrpition || '',
      data.user && new UserSignature(data.user.id || null, data.user.username || '') || null,
      data.ratingAggregation && new RatingAggregation(
      data.ratingAggregation.avg || 0, data.ratingAggregation.count || 0, data.ratingAggregation.sum || 0
      ) || new RatingAggregation(0, 0, 0),
      data.point && new Point(data.point.longitude || null, data.point.altitude || null) || null
    );
  }
}
