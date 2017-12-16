import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";

@Injectable()
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth) { }

  // login with email address
  // returns: Promise<any>
  loginWithEmail(email:string, password:string):Promise<any>{
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // login via facebook account
  // returns: Promise<any>
  loginWithFacebook():Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  // login via Github
  // returns: Promise<any>
  loginWithGithub():Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  // login via google account
  // returns: Promise<any>
  loginWithGoogle():Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // login via Twitter
  // returns: Promise<any>
  loginWithTwitter():Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  // register method
  // parameters: Email - string, Password - string
  // returns: Promise<any>
  register(email: string, password: string):Promise<any>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // checks whether a user is signed in or not
  // returns: Boolean
  userIsSignedIn():boolean{
    if (this.afAuth.auth.currentUser != null) {
      return true;
    } else {
      return false;
    }
  }

  // logout method
  // returns: Promise<any>
  logout():Promise<any> {
    return this.afAuth.auth.signOut();
  }

  // returns: current user with following properties:
  //
  // displayName: string | null;
  // email: string | null;
  // phoneNumber: string | null;
  // photoURL: string | null;
  // providerId: string;
  // uid: string;
  getLoggedInUser():firebase.User{
    return this.afAuth.auth.currentUser;
  }

  // send user an email to restore the password
  forgotPassword(email:string):Promise<any>{
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
