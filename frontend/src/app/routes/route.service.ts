import {Injectable} from '@angular/core';
import {Route} from './route.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirestoreDataService, OrderSettings, PaginatedDataView} from '../commons/firestore-data-services';
import {Observable} from 'rxjs/Observable';
import {FirebaseItem} from '../commons/models/firebase.model';

@Injectable()
export class RouteService extends FirestoreDataService<Route> {
  protected readonly _collectionPath = 'routes';

  constructor(db: AngularFirestore) {
    super(db);
  }

  public getPaginatedView(): PaginatedDataView<Route> {
    return this._getPaginatedView(new OrderSettings('ratingAggregation.avg', true));
  }

  /**
   * retrieves a route given it's reference
   *
   * @param {string} reference the path which references the route e.g. routes/123qwertz.
   * @returns {Observable<FirebaseItem<Route>>}
   */
  public get(reference: string): Observable<FirebaseItem<Route>> {
    return this._get(reference);
  }

  /**
   * retrieves a route given it's id
   *
   * @param {string} id
   * @returns {Observable<FirebaseItem<Route>>}
   */
  public getById(id: string): Observable<FirebaseItem<Route>> {
    return this.get(this._concatPaths(this._collectionPath, id));
  }

  public create(route: Route): Promise<Observable<FirebaseItem<Route>>> {
    return this._create(route);
  }

  public update(route: FirebaseItem<Route>): Promise<void> {
    return this._updateOrCreate(route);
  }

  public delete(route: FirebaseItem<Route>): Promise<void> {
    return this._delete(route);
  }

  protected _deserializeData(data: any): Route {
    return Route.deserialize(data);
  }
}
