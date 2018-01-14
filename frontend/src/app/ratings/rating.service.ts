import {Injectable} from '@angular/core';
import {FirestoreDataService} from '../commons/firestore-data-services';
import {Rating} from './rating.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirebaseItem} from '../commons/models/firebase.model';
import {Rateable} from '../commons/models/rateable';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RatingService extends FirestoreDataService<Rating> {
  protected readonly _collectionPath = 'ratings';

  constructor(db: AngularFirestore) {
    super(db);
  }

  public create(rateable: FirebaseItem<Rateable>, rating: Rating): Promise<Observable<FirebaseItem<Rating>>> {
    return this._create(rating, rateable);
  }

  public update(rating: FirebaseItem<Rating>): Promise<void> {
    return this._updateOrCreate(rating);
  }

  public delete(rating: FirebaseItem<Rating>): Promise<void> {
    return this._delete(rating);
  }

  protected _deserializeData(data: any): Rating {
    return Rating.deserialize(data);
  }
}
