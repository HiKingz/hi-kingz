import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../../user-data/user-data.service';
import {UserSignature} from '../../../user-data/user-data.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrls: ['./username-dialog.component.css']
})
export class UsernameDialogComponent implements OnInit {

  constructor(private userDataService: UserDataService,
              private authService: AuthenticationService,
              private dialogRef: MatDialogRef<UsernameDialogComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addUser(username: string): void {
    this.userDataService.create(new UserSignature(this.authService.getLoggedInUser().uid, username))
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
