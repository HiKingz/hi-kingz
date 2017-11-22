import {Point} from './point.model';
import {FirebaseModel} from '../commons/models/firebase.model';

export class Waypoint extends FirebaseModel {
  constructor(id: string, public name: string, public point: [Point]) {
    super(id);
  }
}
