import {Component} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../authentication/authentication.service';
import {LoginComponent} from './login/login.component';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              public snackBar: MatSnackBar) {
    firebase.initializeApp(environment.firebase);
  }


  // login is executed on click
  login(): void {
    this.dialog.open(LoginComponent, {});
  }


  // logout is executed on click
  logout(): void {
    this.authenticationService.logout()
      .then(() => {
        this.snackBar.open('Logout successful', null, {duration: 1000});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // checks whether user is logged in and depending on it the screen shows either the login option or the logout option
  userIsLoggedIn(): boolean {
    return this.authenticationService.userIsSignedIn();
  }

}
