import {Point} from './point.model';
import {FirebaseStorable} from '../commons/models/firebase-storable';

export class Waypoint {
  constructor(public name: string, public point: Point) { }
}
