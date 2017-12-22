import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { AllRoutesComponent } from './all-routes/all-routes.component';
import { LoginComponent } from './login/login.component';
import { ListRoutesComponent } from './list-routes/list-routes.component';
import { RouteComponent } from './route/route.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { MapComponent } from './map/map.component';
import { RatingComponent } from './rating/rating.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';

import {
  MatDialogModule, MatDialogRef, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressBar,
  MatSnackBarModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthenticationService} from '../authentication/authentication.service';
import {MatButtonModule} from '@angular/material/button';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {UserService} from '../users/user.service';
import { UsernameDialogComponent } from './login/username-dialog/username-dialog.component';

const appRoutes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'map/:mode', component: MapComponent },
  { path: 'create_route', component: CreateRouteComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AllRoutesComponent,
    LoginComponent,
    ListRoutesComponent,
    RouteComponent,
    CreateRouteComponent,
    MapComponent,
    RatingComponent,
    MyRoutesComponent,
    UsernameDialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // debugging purposes only
    ),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'HiKingz'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatTabsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  entryComponents: [LoginComponent, UsernameDialogComponent],
  providers: [AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
