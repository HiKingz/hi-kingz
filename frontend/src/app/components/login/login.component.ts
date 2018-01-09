import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../../users/user.service';
import {UsernameDialogComponent} from './username-dialog/username-dialog.component';
import {UserSignature} from '../../users/user.model';
import {FileService} from '../../files/file.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  private showProgressBar = false;
  private loginSucceeded = 'Login successful.';
  private uidExists = false;

  /**
   * @param {AuthenticationService} authenticationService
   * @param {UserService} userService
   * @param fileService
   * @param {MatDialogRef<LoginComponent>} dialogRef
   * @param {MatSnackBar} snackBar
   * @param dialog
   */
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private fileService: FileService,
              public dialogRef: MatDialogRef<LoginComponent>,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  /**
   * login via email address
   * @param {string} email
   * @param {string} password
   */
  loginWithEmail(email: string, password: string): void {
    this.authenticationService.loginWithEmail(email.toString().trim(), password.toString().trim())
      .then(() => {
        if (!this.authenticationService.getLoggedInUser().emailVerified) {
          this.showSnackBar('Email address is not verified.');
        } else {
          this.closeDialogWithSnackBar(this.loginSucceeded);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * login via facebook
   */
  loginWithFacebook(): void {
    this.providerLogin(this.authenticationService.loginWithFacebook());
  }

  /**
   * login via github
   */
  loginWithGithub(): void {
    this.providerLogin(this.authenticationService.loginWithGithub());
  }

  /**
   * login via twitter
   */
  loginWithTwitter(): void {
    this.providerLogin(this.authenticationService.loginWithTwitter());
  }

  /**
   * login via google account
   */
  loginWithGoogle(): void {
    this.providerLogin(this.authenticationService.loginWithGoogle());
  }

  /**
   * promise and error handling for provider logins
   * @param {Promise<any>} promise
   */
  providerLogin(promise: Promise<any>): void {
    promise
      .then((result) => {
        this.uidInDatabase(result.user.uid);
        this.closeDialogWithSnackBar(this.loginSucceeded);
      }
        )
    .catch((error) => {
        console.log(error);
      });
  }

  /**
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} passwordCheck
   */
  register(username: string, email: string, password: string, passwordCheck: string): void {
    if (this.formIsFilled(username, email)) {
      if (this.passwordIsEqual(password, passwordCheck)) {
        this.showProgressBar = true;
        this.authenticationService.register(username.toString().trim(), email.toString().trim(), password.toString())
          .then((user) => {
            console.log('database operation ' + user.uid);
            this.userService.create(new UserSignature(user.uid, username))
              .then(() => {
                console.log('wrote to database.');
                user.sendEmailVerification()
                  .then(() => {
                    this.authenticationService.logout()
                      .then(() => {
                        this.closeDialogWithSnackBar('Registration completed');
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log('Error writing to database' + error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.showSnackBar('Passwords are not equal.');
      }
    } else {
      this.showSnackBar('Please fill out the form.');
    }
  }

  /**
   * @param {string} email
   */
  forgotPassword(email: string): void {
    if (email.length !== 0) {
      this.authenticationService.forgotPassword(email.trim())
        .then(() => {
          this.closeDialogWithSnackBar('Verification email sent. Please check your inbox.');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.showSnackBar('Please enter an email address.');
    }
  }

  // when successfully logged in this function closes the login dialogue and sends a Snackbar
  /**
   * @param {string} message
   */
  closeDialogWithSnackBar(message: string): void {
    this.dialogRef.close();
    this.showSnackBar(message);
  }

  /**
   * @param {string} message
   */
  showSnackBar(message: string): void {
    this.snackBar.open(message, null, {duration: 1000});
  }

  /**
   * @param {string} username
   * @param {string} email
   * @returns {boolean}
   */
  formIsFilled(username: string, email: string): boolean {
    return username.length !== 0 || email.length !== 0;
  }

  upload(event) {
    const file = event.target.files[0];
    this.fileService.upload(file);
  }

  /**
   * @param {string} password
   * @param {string} passwordCheck
   * @returns {boolean}
   */
  passwordIsEqual(password: string, passwordCheck: string): boolean {
    return password.toString() === passwordCheck.toString();
  }

  /**
   * opens username dialog
   */
  openUsernameDialog(): void {
    this.dialog.open(UsernameDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }

  /**
   * checks if userid is already in database
   * @param {string} uid
   * @returns {boolean}
   */
  uidInDatabase(uid: string): void {
    this.uidExists = false;
    this.userService.getById(uid).subscribe(
      (x) => {
        console.log(x);
        this.uidExists = true;
      },
      () => {
        if (this.uidExists !== true) {
          this.openUsernameDialog();
        }
      },
      () => {

      }
    );
  }
}
