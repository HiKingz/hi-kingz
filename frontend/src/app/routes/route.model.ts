import {User} from '../users/user.model';
import {Rating} from '../ratings/rating.model';
import {File} from '../files/file.model';
import {Waypoint} from '../coordinates/waypoint.model';
import {Rateable} from '../commons/models/rateable.model';
import {IFileable} from '../commons/models/fileable';

class Route extends Rateable implements IFileable {
  constructor(
    id: string,
    ratings: [Rating],
    public files: [File],
    public name: string,
    public description: string,
    public difficulty: number,
    public user: User,
    public waypoint: Waypoint,
    public isPublic: boolean,
    public isSponsored: boolean
  ) {
    super(id, ratings);
  }
}
