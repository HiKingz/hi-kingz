import {User} from '../users/user.model';
import {Rating} from '../ratings/rating.model';
import {File} from '../files/file.model';
import {Waypoint} from '../coordinates/waypoint.model';
import {IFileable} from '../commons/models/fileable';
import {IRateable} from '../commons/models/rateable';
import {Direction} from '../directions/direction.model';
import {IFirebaseStorable} from '../commons/models/firebase-storable';

export class Route implements IFileable, IRateable, IFirebaseStorable {
  constructor(
    public ratings: [Rating],
    public files: [File],
    public name: string,
    public description: string,
    public difficulty: number,
    public user: User,
    public waypoints: [Waypoint],
    public direction: Direction,
    public isPublic: boolean,
    public isSponsored: boolean
  ) { }
}
