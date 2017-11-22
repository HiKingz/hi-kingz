import {FirebaseModel} from '../commons/models/firebase.model';

export class User extends FirebaseModel {
  constructor(id: string) {
    super(id);
  }
}
