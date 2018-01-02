import {UserSignature} from '../users/user.model';
import {File} from '../files/file.model';
import {Fileable} from '../commons/models/fileable';
import {FirebaseStorable} from '../commons/models/firebase-storable';

export class Rating implements Fileable, FirebaseStorable {
  constructor(
    public files: Array<File>,
    public user: UserSignature,
    public rating: number,
    public comment: string,
  ) { }
}
