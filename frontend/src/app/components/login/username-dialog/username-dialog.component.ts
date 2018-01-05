import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../users/user.service';
import {User, UserSignature} from '../../../users/user.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {FirebaseItem} from '../../../commons/models/firebase.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrls: ['./username-dialog.component.css']
})
export class UsernameDialogComponent implements OnInit {

  constructor(private userService: UserService,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }

  addUser(username: string): void {
    this.userService.create(new UserSignature(this.authService.getLoggedInUser().uid, username))
      .then(() => {
        console.log('successful.');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
