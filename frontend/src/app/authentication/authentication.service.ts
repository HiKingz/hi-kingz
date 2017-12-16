import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";

@Injectable()
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth) { }

  // login with email address
  loginWithEmail(email:string, password:string):Promise<any>{
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // login via facebook account
  loginWithFacebook():Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginWithGithub():Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  // login via google account
  loginWithGoogle():Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithTwitter():Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  // register method
  register(email: string, password: string):Promise<any>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // checks whether a user is signed in or not
  // returns true or false
  userIsSignedIn():boolean{

    let user = this.afAuth.auth.currentUser;

    if (user != null) {
      return true;
    } else {
      return false;
    }
  }

  // logout method
  logout():Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
