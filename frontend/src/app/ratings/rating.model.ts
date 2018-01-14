import {UserSignature} from '../user-data/user-data.model';
import {File} from '../files/file.model';
import {Fileable} from '../commons/models/fileable';
import {FirebaseStorable} from '../commons/models/firebase-storable';

export class Rating extends FirebaseStorable implements Fileable {
  constructor(
    public files: Array<File>,
    public user: UserSignature,
    public rating: number,
    public comment: string,
  ) {
    super();
  }

  public static deserialize(data: any): Rating {
    return new Rating(
      // TODO check if files does need to be deserialized
      null,
      data.user && new UserSignature(data.user.id || null, data.user.username || '') || null,
      data.rating || null,
      data.comment || ''
    );
  }
}
