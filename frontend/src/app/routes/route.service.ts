import {Injectable} from '@angular/core';
import {Route} from './route.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirestoreDataService, PaginatedDataView} from '../commons/firestore-data-services';
import {File} from '../files/file.model';
import {Waypoint} from '../coordinates/waypoint.model';
import {Point} from '../coordinates/point.model';
import {Observable} from 'rxjs/Observable';
import {FirebaseItem} from '../commons/models/firebase.model';
import {UserSignature} from '../users/user.model';
import {RatingAggregation} from '../commons/models/rateable';

@Injectable()
export class RouteService extends FirestoreDataService<Route> {
  protected readonly _collectionPath = 'routes';

  constructor(db: AngularFirestore) {
    super(db);
  }

  public getPaginatedView(): PaginatedDataView<Route> {
    return this._getPaginatedView('name');
  }

  public get(id: string): Observable<FirebaseItem<Route>> {
    return this._get(id);
  }

  public create(route: Route): Promise<Observable<FirebaseItem<Route>>> {
    return this._create(route);
  }

  public update(route: FirebaseItem<Route>): Promise<void> {
    return this._update(route);
  }

  public delete(route: FirebaseItem<Route>): Promise<void> {
    return this._delete(route);
  }

  protected _deserializeData(data: any): Route {
    return new Route(
      // TODO deserialize properly when model is done
      data.files && data.files.map(fileData => new File()) || [],
      data.name || '',
      data.descrpition || '',
      data.difficulty || null,
      data.user && new UserSignature(data.user.id || null, data.user.username || '') || null,
      data.waypoints && data.waypoints.map(
        waypointData => new Waypoint(
          waypointData.name || '',
          waypointData.point && new Point(
            waypointData.point.longitude || null, waypointData.point.altitude || null
          ) || null
        )
      ) || [],
      data.direction && data.direction.map(
        directionData => new Point(directionData.longitude || null, directionData.altitude || null)
      ) || [],
      data.ratingAggregation && new RatingAggregation(
        data.ratingAggregation.averageRating || 0, data.ratingAggregation.totalRatings || 0
      ) || new RatingAggregation(0, 0),
      data.isPublic || false,
      data.isSponsored || false
    );
  }
}
