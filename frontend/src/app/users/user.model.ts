import {IFirebaseStorable} from '../commons/models/firebase-storable';

export class User implements IFirebaseStorable {
  uID: string;
  username: string;

  /**
   * @param {string} _uID
   * @param {string} _username
   */
  constructor(
    _uID: string,
    _username: string) {
    this.uID = _uID;
    this.username = _username;
  }

  toString() {
    console.log('uID - ' + this.uID + '/nUsername - ' + this.username);
  }

}
