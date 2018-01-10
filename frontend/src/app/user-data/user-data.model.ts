import {FirebaseStorable} from '../commons/models/firebase-storable';

export class UserSignature {
  constructor(public id: string, public username: string) { }
}

export class UserData implements FirebaseStorable {
  constructor(public userSignature: UserSignature, public favorites: Array<string>) { }
}
