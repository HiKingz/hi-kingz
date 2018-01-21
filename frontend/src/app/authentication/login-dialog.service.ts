import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {LoginComponent} from '../components/login/login.component';
import {MatDialog} from '@angular/material';

@Injectable()
export class LoginDialogService {
  constructor(private authenticationService: AuthenticationService, private _dialog: MatDialog) {}

  public open() {
    this._dialog.open(LoginComponent, {
      width: '400px'
    });
  }
}
