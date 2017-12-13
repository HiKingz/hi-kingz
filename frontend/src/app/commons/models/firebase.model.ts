import {IFirebaseStorable} from './firebase-storable';

export class FirebaseItem<Model extends IFirebaseStorable> {
  constructor(public id: string, public item: Model) { }
}
