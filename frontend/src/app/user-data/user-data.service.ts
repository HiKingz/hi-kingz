import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {UserData, UserSignature} from './user-data.model';
import {FirestoreDataService} from '../commons/firestore-data-services';
import {FirebaseItem} from '../commons/models/firebase.model';
import {AuthenticationService} from '../authentication/authentication.service';
import 'rxjs/add/operator/first';

@Injectable()
export class UserDataService extends FirestoreDataService<UserData> {
  protected readonly _collectionPath: string = 'user-data';
  public currentUserData: UserData = null;

  constructor(db: AngularFirestore, private _authService: AuthenticationService) {
    super(db);
    this._authService.onLogin.subscribe(() => this._loadCurrentUserData());
    this._authService.onLogout.subscribe(() => this.currentUserData = null);
  }

  public async create(user: UserSignature): Promise<Observable<FirebaseItem<UserData>>> {
    const firebaseItem = new FirebaseItem<UserData>(
      this._concatPaths(this._collectionPath, user.id),
      new UserData(user, [])
    );
    await this._updateOrCreate(firebaseItem);
    return this._get(firebaseItem.reference);
  }

  private _loadCurrentUserData() {
    this.getById(this._authService.getLoggedInUser().uid).first().subscribe(
      userDataItem => this.currentUserData = userDataItem.item
    );
  }

  public getById(uid: string): Observable<FirebaseItem<UserData>> {
    return this._get(this._concatPaths(this._collectionPath, uid));
  }

  public update(user: FirebaseItem<UserData>): Promise<void> {
    return this._updateOrCreate(user);
  }

  protected _deserializeData(data: any): UserData {
    return new UserData(
      data.userSignature && new UserSignature(
        data.userSignature.id || null,
        data.userSignature.username || ''
      ) || new UserSignature(null, ''),
      data.favorites || []
    );
  }
}
