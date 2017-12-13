import {Point} from './point.model';
import {IFirebaseStorable} from '../commons/models/firebase-storable';

export class Waypoint implements IFirebaseStorable {
  constructor(public name: string, public point: Point) { }
}
