import {Injectable} from '@angular/core';
import {Poi} from './poi.model';
import {FirestoreDataService} from '../commons/firestore-data-services';
import {UserSignature} from '../user-data/user-data.model';
import {Point} from '../coordinates/point.model';
import {Observable} from 'rxjs/Observable';
import {FirebaseItem} from '../commons/models/firebase.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {RatingAggregation} from '../commons/models/rateable';
import {File} from '../files/file.model';

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
    // TODO; erstmal dummies rausgeben...
  const pois = [
    new FirebaseItem('0',
      new Poi(
        [new File('http://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_grande.png?v=1480481059')],
        'Holy sh*t',
        'Das ist der größte Hundehaufen, den ich je gesehen habe. Ich frage mich, wie er aussah, bevor die ganzen Radfahrer drübergewalzt sind.',
        new UserSignature('0', 'Witzelbritz'), new RatingAggregation(0, 0, 0),
        new Point(8.34958214937908, 50.08016862900732)
      )
    ),
  ];
    return Observable.create(observer => {
      observer.next(pois);
      observer.complete();
    });
    // return null;
  }

  protected _deserializeData(data: any): Poi {
    return Poi.deserialize(data);
  }
}
