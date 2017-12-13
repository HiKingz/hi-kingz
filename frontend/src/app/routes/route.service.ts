import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Route} from './route.model';

@Injectable()
export class RouteService {
  constructor(db: AngularFireDatabase) {
  }
}
