import {FirebaseStorable} from './firebase-storable';

export interface Rateable extends FirebaseStorable {
  averageRating: number;
}
