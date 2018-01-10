import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../authentication/authentication.service';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import {LoginDialogService} from '../authentication/login-dialog.service';
import {UserDataService} from '../user-data/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService,
    private loginDialogService: LoginDialogService,
    public snackBar: MatSnackBar
  ) {
    firebase.initializeApp(environment.firebase);
  }

  logout(): void {
    this.authenticationService.logout()
      .then(() => {
        this.snackBar.open('Logout successful', null, {duration: 1000});
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
