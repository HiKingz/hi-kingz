import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../users/user.service';
import {UserSignature} from '../../../users/user.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrls: ['./username-dialog.component.css']
})
export class UsernameDialogComponent implements OnInit {

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private dialogRef: MatDialogRef<UsernameDialogComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addUser(username: string): void {
    this.userService.create(new UserSignature(this.authService.getLoggedInUser().uid, username))
      .then(() => {
        console.log('successful.');
        this.closeDialogWithSnackBar('Welcome ' + username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
}
