import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User, UserSignature} from './user.model';
import {FirestoreDataService} from '../commons/firestore-data-services';
import {FirebaseItem} from '../commons/models/firebase.model';

@Injectable()
export class UserService extends FirestoreDataService<User> {
  protected readonly _collectionPath: string = 'users';

  constructor(db: AngularFirestore) {
    super(db);
  }

  public create(user: UserSignature): Promise<Observable<FirebaseItem<User>>> {
    return this._create(user);
  }

  public getUser(): Observable<FirebaseItem<User>> {
    // TODO
    return null;
  }

  protected _deserializeData(data: any): User {
    // TODO
    return undefined;
  }
}
