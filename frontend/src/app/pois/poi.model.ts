import {Rateable} from '../commons/models/rateable.model';
import {IFileable} from '../commons/models/fileable';
import {Rating} from '../ratings/rating.model';
import {User} from '../users/user.model';
import {Point} from '../coordinates/point.model';
import {File} from '../files/file.model';

export class Poi extends Rateable implements IFileable {
  constructor(
    id: string,
    ratings: [Rating],
    public files: [File],
    public name: string,
    public description: string,
    public user: User,
    public point: Point,
  ) {
    super(id, ratings);
  }
}
