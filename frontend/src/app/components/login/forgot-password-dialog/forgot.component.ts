import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ForgotComponent>,
              public authService: AuthenticationService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  sendPassword(email: string): void {
    this.authService.forgotPassword(email)
      .then(() => {
        this.dialogRef.close();
        this.showSnackBar('Email zur Wiederherstellung des Passworts versendet.');
      });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, null, {duration: 1000});
  }
}
