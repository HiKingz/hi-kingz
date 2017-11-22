import {User} from '../users/user.model';
import {File} from '../files/file.model';
import {Fileable} from '../commons/models/fileable.model';

export class Rating extends Fileable {
  constructor(
    id: string,
    files: [File],
    public user: User,
    public score: number,
    public comment: string,
  ) {
    super(id, files);
  }
}
