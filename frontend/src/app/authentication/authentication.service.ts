import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";

@Injectable()
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth) { }

  // login with email address
  loginWithEmail(email:string, password:string){
    if(!this.userIsSignedIn()) {
      this.afAuth.auth.signInWithEmailAndPassword(email,
        password)
        .then(function () {
          console.log("login successful");
          return true;
        })
        .catch(function (error) {
          console.log(error + email);
          return false;
        });
    }
  }

  // login via facebook account
  loginWithFacebook(){
    //TODO
  }

  // login via google account
  loginWithGoogle(){
    if(!this.userIsSignedIn()){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function () {
          console.log("login successful");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // register method
  register(email: string, password: string){
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
        console.log("Registration of " + email + " completed");
      }).catch(function (error) {
        console.log(error + email);
    })
  }

  // checks whether a user is signed in or not
  // returns true or false
  userIsSignedIn(){

    var user = firebase.auth().currentUser;

    if (user) {
      console.log(user.email + ' logged in');
      return true;
    } else {
      console.log('No user logged in');
      return false;
    }
  }

  // logout method
  logout(){
    if (this.userIsSignedIn()){
      firebase.auth().signOut()
        .then(function () {
          console.log('Logged out.');
        })
        .catch(function (error) {
          console.log('function: logout ' + error);
        })
    }
  }

}
