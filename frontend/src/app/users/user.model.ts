import {FirebaseStorable} from '../commons/models/firebase-storable';

export class UserSignature {
  constructor(public id: string, public username: string) { }
}

export class User extends UserSignature implements FirebaseStorable {
  constructor(id: string, username: string) {
    super(id, username);
  }
}
