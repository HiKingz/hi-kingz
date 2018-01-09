import {FirebaseStorable} from './firebase-storable';

export class RatingAggregation {
  constructor(public avg: number, public count: number, public sum: number) {}
}

export interface Rateable extends FirebaseStorable {
  ratingAggregation: RatingAggregation;
}
