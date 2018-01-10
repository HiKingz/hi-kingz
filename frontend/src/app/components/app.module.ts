import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';


import {AppComponent} from './app.component';
import {AllRoutesComponent} from './all-routes/all-routes.component';
import {LoginComponent} from './login/login.component';
import {ListRoutesComponent} from './list-routes/list-routes.component';
import {RouteComponent} from './route/route.component';
import {MapComponent} from './map/map.component';
import {RouteUIComponent} from './route-ui/route-ui.component';
import {PoiUIComponent} from './poi-ui/poi-ui.component';
import {CreateRouteComponent} from './create-route/create-route.component';
import {EditRouteComponent} from './edit-route/edit-route.component';
import {ShowRouteComponent} from './show-route/show-route.component';
import {RatingComponent} from './rating/rating.component';
import {MyRoutesComponent} from './my-routes/my-routes.component';

import {
  MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSnackBarModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthenticationService} from '../authentication/authentication.service';
import {MatButtonModule} from '@angular/material/button';
import {RouteService} from '../routes/route.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {RatingService} from '../ratings/rating.service';
import {PoiService} from '../pois/poi.service';
import {UserService} from '../users/user.service';
import {UsernameDialogComponent} from './login/username-dialog/username-dialog.component';
import {CreatePoiComponent} from './create-poi/create-poi.component';
import {FileService} from '../files/file.service';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {MediaDialogComponent} from './media-dialog/media-dialog.component';
import {ForgotComponent} from './login/forgot-password-dialog/forgot.component';

const appRoutes: Routes = [
  { path: 'create_route', component: CreateRouteComponent },
  { path: 'edit_route/:id', component: EditRouteComponent },
  { path: 'show_route/:id', component: ShowRouteComponent },
  { path: 'create_poi', component: CreatePoiComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    AllRoutesComponent,
    LoginComponent,
    ListRoutesComponent,
    RouteComponent,
    CreateRouteComponent,
    CreatePoiComponent,
    EditRouteComponent,
    ShowRouteComponent,
    MapComponent,
    RouteUIComponent,
    PoiUIComponent,
    RatingComponent,
    MyRoutesComponent,
    UsernameDialogComponent,
    MediaDialogComponent,
    ForgotComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // debugging purposes only
    ),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'HiKingz'),
    AngularFireAuthModule,
    AngularFirestoreModule,
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
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  entryComponents: [LoginComponent, UsernameDialogComponent, MediaDialogComponent, ForgotComponent],
  providers: [AuthenticationService, RouteService, RatingService, PoiService, UserService, FileService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
