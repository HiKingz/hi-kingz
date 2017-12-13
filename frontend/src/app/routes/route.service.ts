import { Injectable } from '@angular/core';
import {Route} from './route.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirebaseItem} from '../commons/models/firebase.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RouteService {
  constructor(db: AngularFirestore) {
  }

  public saveRoute(route: Route): Observable<FirebaseItem<Route>> {
    // TODO
    return null;
  }

  public updateRoute(route: FirebaseItem<Route>): Observable<FirebaseItem<Route>> {
    // TODO
    return null;
  }

  public getRoutes(page: number = 0, pageSize: number = 40): Observable<[FirebaseItem<Route>]> {
    // TODO
    return null;
  }

  public filterRoutes(name: string, page: number = 0, pageSize: number = 40): Observable<[FirebaseItem<Route>]> {
    // TODO
    return null;
  }

  public deleteRoute(route: FirebaseItem<Route>): Observable<void> {
    // TODO
    return null;
  }
}
