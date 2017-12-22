import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from './user.model';
import * as firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class UserService {
  private basepath = 'User';
  user: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection<User>(this.basepath);
    this.user  = this.userCollection.valueChanges();
  }

  addUser(uID: string, username: string): Promise<DocumentReference> {
    console.log('Adding User ' + uID);
    return this.userCollection.add({uID, username});
  }

  getAllUsers(): Observable<User[]> {
    return this.user;
  }
}
