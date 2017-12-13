import {User} from '../users/user.model';
import {File} from '../files/file.model';
import {IFileable} from '../commons/models/fileable';
import {IFirebaseStorable} from '../commons/models/firebase-storable';

export class Rating implements IFileable, IFirebaseStorable {
  constructor(
    public files: [File],
    public user: User,
    public score: number,
    public comment: string,
  ) { }
}
