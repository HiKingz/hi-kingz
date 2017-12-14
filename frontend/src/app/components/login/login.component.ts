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

  // when successfully logged in this function closes the login dialogue and sends a Snackbar
  loginSucceeded():void{
    this.dialogRef.close();
    this.snackBar.open( "Login successful", null, {duration: 1000});
  }

  // login with email address
  loginWithEmail(email, password):void{
    this.authenticationService.loginWithEmail(email.toString().trim(), password.toString().trim())
      .then(() => {
        if(!this.authenticationService.getLoggedInUser().emailVerified){
          this.snackBar.open("Email address is not verified.", null, {duration: 1000});
        }
        else{
          this.loginSucceeded();
        }
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  // login via facebook account
  loginWithFacebook():void{
    this.authenticationService.loginWithFacebook()
      .then(()=>{
        this.loginSucceeded();
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  // login via Github
  loginWithGithub():void{
    this.authenticationService.loginWithGithub()
      .then(()=>{
        this.loginSucceeded();
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  // login via Twitter
  loginWithTwitter():void{
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
  register(email: string, password: string):void{
    if(email.length != 0){
      if(password.length != 0) {
        this.authenticationService.register(email.toString().trim(), password.toString().trim())
          .then((user)=>{
            user.sendEmailVerification()
              .catch((error)=>{
                console.log(error);
              });
            this.authenticationService.logout();
            this.dialogRef.close();
            this.snackBar.open('Registration completed', null, {duration: 1000});
          })
          .catch((error) => {
            console.log(error);
          })
      }
      else {
        this.snackBar.open('Please enter a password.');
      }
    }
    else{
      this.snackBar.open('Please enter an email address.');
    }
  }

  forgotPassword(email:string):void{
    if (email.length != 0) {
      this.authenticationService.forgotPassword(email.trim())
        .then(()=>{
          this.dialogRef.close();
          this.snackBar.open('Email sent. Please check your inbox.', null, {duration: 1000});
        })
        .catch((error)=>{
          console.log(error);
        })
    }
    else{
      this.snackBar.open("Please enter an email address.", null, {duration: 1000});
    }
  }
}
