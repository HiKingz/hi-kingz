import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthenticationService {

  /**
   * @param {AngularFireAuth} afAuth
   */
  constructor(public afAuth: AngularFireAuth) { }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  loginWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * @returns {Promise<any>}
   */
  loginWithFacebook(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  /**
   * @returns {Promise<any>}
   */
  loginWithGithub(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  /**
   * @returns {Promise<any>}
   */
  loginWithGoogle(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  /**
   * @returns {Promise<any>}
   */
  loginWithTwitter(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  /**
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  register(username: string, email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * @returns {boolean}
   */
  userIsSignedIn(): boolean {
    return this.afAuth.auth.currentUser != null;
  }

  /**
   * @returns {Promise<any>}
   */
  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  /**
   * @returns {firebase.User}
   */
  getLoggedInUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  /**
   * @param {string} email
   * @returns {Promise<any>}
   */
  // send user an email to restore the password
  forgotPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
