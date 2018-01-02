import {File} from '../files/file.model';
import {Waypoint} from '../coordinates/waypoint.model';
import {Fileable} from '../commons/models/fileable';
import {Rateable, RatingAggregation} from '../commons/models/rateable';
import {FirebaseStorable} from '../commons/models/firebase-storable';
import {UserSignature} from '../users/user.model';
import {Point} from '../coordinates/point.model';

export class Route implements Fileable, Rateable, FirebaseStorable {
  constructor(
    public files: Array<File>,
    public name: string,
    public description: string,
    public difficulty: number,
    public user: UserSignature,
    public waypoints: Array<Waypoint>,
    public direction: Array<Point>,
    public ratingAggregation: RatingAggregation,
    public isPublic: boolean,
    public isSponsored: boolean
  ) { }
}
