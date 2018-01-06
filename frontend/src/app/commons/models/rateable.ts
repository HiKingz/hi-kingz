import {FirebaseStorable} from './firebase-storable';

export class RatingAggregation {
  constructor(public ratingsCount: number, ratingsSum: number) { }
}

export interface Rateable extends FirebaseStorable {
  ratingAggregation: RatingAggregation;
}
