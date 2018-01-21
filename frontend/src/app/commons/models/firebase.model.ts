import {FirebaseStorable} from './firebase-storable';

export class FirebaseItem<Model extends FirebaseStorable> {
  constructor(public reference: string, public item: Model) { }

  public get id(): string {
    return this.reference ? this.reference.split('/').pop() : null;
  }
}
