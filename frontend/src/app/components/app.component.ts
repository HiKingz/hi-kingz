import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../authentication/authentication.service';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import {LoginDialogService} from '../authentication/login-dialog.service';
import {UserDataService} from '../user-data/user-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authenticationService: AuthenticationService,
    public userDataService: UserDataService,
    public loginDialogService: LoginDialogService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {
    firebase.initializeApp(environment.firebase);
  }

  logout(): void {
    this.authenticationService.logout()
      .then(() => {
        this.goToRootRoute();
        this.snackBar.open('Logout successful', null, {duration: 1000});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  goToRootRoute(): void {
    this.router.navigate(['/']);
  }
}
