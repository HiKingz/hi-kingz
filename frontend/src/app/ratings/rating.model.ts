import {User} from '../users/user.model';
import {File} from '../files/file.model';
import {IFileable} from '../commons/models/fileable';

export class Rating implements IFileable {
  constructor(
    public files: [File],
    public user: User,
    public score: number,
    public comment: string,
  ) { }
}
