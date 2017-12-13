import {IFileable} from '../commons/models/fileable';
import {Rating} from '../ratings/rating.model';
import {User} from '../users/user.model';
import {Point} from '../coordinates/point.model';
import {File} from '../files/file.model';
import {IRateable} from '../commons/models/rateable';
import {IFirebaseStorable} from '../commons/models/firebase-storable';

export class Poi implements IFileable, IRateable, IFirebaseStorable {
  constructor(
    public ratings: [Rating],
    public files: [File],
    public name: string,
    public description: string,
    public user: User,
    public point: Point,
  ) { }
}
