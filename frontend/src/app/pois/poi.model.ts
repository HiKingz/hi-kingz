import {Fileable} from '../commons/models/fileable';
import {UserSignature} from '../users/user.model';
import {Point} from '../coordinates/point.model';
import {File} from '../files/file.model';
import {Rateable, RatingAggregation} from '../commons/models/rateable';
import {FirebaseStorable} from '../commons/models/firebase-storable';

export class Poi implements Fileable, Rateable, FirebaseStorable {
  constructor(
    public files: Array<File>,
    public name: string,
    public description: string,
    public user: UserSignature,
    public ratingAggregation: RatingAggregation,
    public point: Point,
  ) { }
}
