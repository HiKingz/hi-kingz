import {Rating} from '../../ratings/rating.model';
import {FirebaseModel} from './firebase.model';
import {IRateable} from './rateable';

export abstract class Rateable extends FirebaseModel implements IRateable {
  constructor(id: string, public ratings: [Rating]) {
    super(id);
  }
}
