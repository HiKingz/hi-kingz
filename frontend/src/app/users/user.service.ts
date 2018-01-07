import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User, UserSignature} from './user.model';
import {FirestoreDataService} from '../commons/firestore-data-services';
import {FirebaseItem} from '../commons/models/firebase.model';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class UserService extends FirestoreDataService<User> {
  protected readonly _collectionPath: string = 'users';

  constructor(db: AngularFirestore, private _authService: AuthenticationService) {
    super(db);
  }

  public async create(user: UserSignature): Promise<Observable<FirebaseItem<User>>> {
    const firebaseItem = new FirebaseItem<User>(
      this._concatPaths(this._collectionPath, user.id),
      {...user, favorites: []}
    );
    await this._updateOrCreate(firebaseItem);
    return this._get(firebaseItem.reference);
  }

  public getUser(): Observable<FirebaseItem<User>> {
    return this._authService.userIsSignedIn() ? this._get(
      this._concatPaths(this._collectionPath, this._authService.getLoggedInUser().uid)
    ) : null;
  }

  public update(user: FirebaseItem<User>): Promise<void> {
    return this._updateOrCreate(user);
  }

  protected _deserializeData(data: any): User {
    return new User(
      data.id || null,
      data.username || '',
      data.favorites || []
    );
  }
}
