import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";
import {MatDialogRef, MatSnackBar} from "@angular/material";

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

  loginSucceeded():void{
    this.dialogRef.close();
    this.snackBar.open("Login successful", null, {duration: 1000});
  }

  // login with email address
  loginWithEmail(email, password){
    this.authenticationService.loginWithEmail(email.toString().trim(), password.toString().trim())
      .then(() => {
        this.loginSucceeded();
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  // login via facebook account
  loginWithFacebook(){
    this.authenticationService.loginWithFacebook()
      .then(()=>{
        this.loginSucceeded();
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  loginWithGithub(){
    this.authenticationService.loginWithGithub()
      .then(()=>{
        this.loginSucceeded();
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  loginWithTwitter(){
    this.authenticationService.loginWithTwitter()
      .then(()=>{
        this.loginSucceeded();
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  // login via google account
  loginWithGoogle():void {
    this.authenticationService.loginWithGoogle()
      .then(()=>{
        this.loginSucceeded();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // register method
  register(email: string, password: string){
    if(email.length != 0){
      if(password.length != 0) {
        this.authenticationService.register(email.toString().trim(), password.toString().trim())
          .then(()=>{
            this.dialogRef.close();
            this.snackBar.open('Registration completed', null, {duration: 1000});
          })
          .catch((error) => {
            console.log(error);
          })
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
