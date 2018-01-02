import {FirebaseStorable} from './firebase-storable';

export class FirebaseItem<Model extends FirebaseStorable> {
  constructor(public reference: string, public item: Model) { }
}
