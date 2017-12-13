import {IFirebaseStorable} from '../commons/models/firebase-storable';

export class Point implements IFirebaseStorable {
  constructor(public longitude: number, public altitude: number) { }
}
