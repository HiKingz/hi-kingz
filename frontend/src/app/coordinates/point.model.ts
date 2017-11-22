import {FirebaseModel} from '../commons/models/firebase.model';

export class Point extends FirebaseModel {
  constructor(id: string, public longitude: number, public altitude: number) {
    super(id);
  }
}
