import {FirebaseStorable} from '../commons/models/firebase-storable';
import {Point} from '../coordinates/point.model';

export class Direction {
  constructor(public points: Array<Point>) {}
}
