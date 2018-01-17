import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserDataService} from '../../user-data/user-data.service';
import {UsernameDialogComponent} from './username-dialog/username-dialog.component';
import {UserSignature} from '../../user-data/user-data.model';
import {FileService} from '../../files/file.service';
import {ForgotComponent} from './forgot-password-dialog/forgot.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  private showProgressBar = false;
  private errorCodePassword = 'auth/wrong-password';
  private errorCodeEmail = 'auth/invalid-email';

  private loginSucceeded = 'Login erfolgreich.';
  private loginNotSucceeded = 'Login nicht erfolgreich.';
  private alertWrongPassword = 'Falsches Passwort';
  private alertWrongEmail = 'Unbekannte Emailadresse';
  private alertNotVerified = 'Emailadresse ist nicht verifiziert.';
  private alertRegistrationCompleted = 'Registrierung vollständig';
  private alterPasswordNotEqual = 'Eingegebene Passwörter sind nicht gleich.';
  private alertFillOutTheForm = 'Bitte die Felder ausfüllen.';

  /**
   * @param {AuthenticationService} authenticationService
   * @param {UserDataService} userService
   * @param {FileService} fileService
   * @param {MatDialogRef<LoginComponent>} dialogRef
   * @param {MatSnackBar} snackBar
   * @param {MatDialog} dialog
   * @param {MatDialog} passwordDialog
   */
  constructor(private authenticationService: AuthenticationService,
              private userService: UserDataService,
              private fileService: FileService,
              public dialogRef: MatDialogRef<LoginComponent>,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public passwordDialog: MatDialog) {
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
      .then((user) => {
        if (!user.emailVerified) {
          this.authenticationService.logout()
            .then(() => {
              this.showSnackBar(this.alertNotVerified);
              this.closeDialogWithSnackBar(this.loginNotSucceeded);
            });
        } else {
          this.closeDialogWithSnackBar(this.loginSucceeded);
        }
      })
      .catch((error) => {
        if (error.code === this.errorCodePassword) {
          this.showSnackBar(this.alertWrongPassword);
        } else if (error.code === this.errorCodeEmail) {
          this.showSnackBar(this.alertWrongEmail);
        }
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
            this.userService.create(new UserSignature(user.uid, username))
              .then(() => {
                user.sendEmailVerification()
                  .then(() => {
                    this.authenticationService.logout()
                      .then(() => {
                        this.closeDialogWithSnackBar(this.alertRegistrationCompleted);
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
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.showSnackBar(this.alterPasswordNotEqual);
      }
    } else {
      this.showSnackBar(this.alertFillOutTheForm);
    }
  }

  forgotPassword(): void {
    this.dialogRef.close();
    this.passwordDialog.open(ForgotComponent, {});
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
      width: '40%',
      disableClose: true
    });
  }

  /**
   * checks if userid is already in database
   * @param {string} uid
   * @returns {boolean}
   */
  uidInDatabase(uid: string): void {
    this.userService.exists(uid).subscribe(
      payload => {
        if (payload.payload.exists === false) {
          this.openUsernameDialog();
        }
      }
    );
  }
}
