import {FirebaseStorable} from '../commons/models/firebase-storable';

export class UserSignature {
  constructor(public id: string, public username: string) { }
}

export class UserData extends FirebaseStorable {
  constructor(public userSignature: UserSignature, public favorites: Array<string>) {
    super();
  }

  public static deserialize(data: any): UserData {
    return new UserData(
      data.userSignature && new UserSignature(
      data.userSignature.id || null,
      data.userSignature.username || ''
      ) || new UserSignature(null, ''),
      data.favorites || []
    );
  }
}
