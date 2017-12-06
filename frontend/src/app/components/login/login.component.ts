import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";
import {MatDialogRef, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              public dialogRef: MatDialogRef<LoginComponent>,
              public snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  // login with email address
  loginWithEmail(email, password){
    if (this.authenticationService.loginWithEmail(email.toString().trim(),
        password.toString().trim())){
      this.dialogRef.close();
    }
    else {
      this.snackBar.open('Login attempt was not successful.');
    }
  }

  // login via facebook account
  loginWithFacebook(){
    //TODO
  }

  // login via google account
  loginWithGoogle() {
    this.authenticationService.loginWithGoogle();
    this.dialogRef.close();
  }

  // register method
  register(email: string, password: string){
    if(email.length != 0){
      if(password.length != 0) {
        this.authenticationService.register(email.toString().trim(),
          password.toString().trim())
      }
      else{
        this.snackBar.open('Please enter a password.');
      }
    }
    else{
      this.snackBar.open('Please enter an email address.');
    }
  }
}
