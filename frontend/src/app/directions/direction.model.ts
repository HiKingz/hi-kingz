import {IFirebaseStorable} from '../commons/models/firebase-storable';
import {Point} from '../coordinates/point.model';

export class Direction implements IFirebaseStorable {
  constructor(public points: [Point]) {}
}
