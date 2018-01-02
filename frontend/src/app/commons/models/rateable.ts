import {FirebaseStorable} from './firebase-storable';

export class RatingAggregation {
  constructor(public averageRating: number, totalRatings: number) { }
}

export interface Rateable extends FirebaseStorable {
  ratingAggregation: RatingAggregation;
}
