import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {LoginComponent} from '../components/login/login.component';
import {MatDialog} from '@angular/material';

@Injectable()
export class AuthenticationService {
  private _logoutSubject = new Subject();
  private _loginSubject = new Subject();

  public onLogout: Observable<any> = this._logoutSubject.asObservable();
  public onLogin: Observable<any> = this._loginSubject.asObservable();

  /**
   *
   * @param {AngularFireAuth} afAuth
   * @param {MatDialog} _dialog
   */
  constructor(public afAuth: AngularFireAuth) {
    afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this._loginSubject.next();
        } else {
          this._logoutSubject.next();
        }
      }
    );
  }

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
