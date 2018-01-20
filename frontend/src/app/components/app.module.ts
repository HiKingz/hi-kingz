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
import {ShowRouteComponent} from './show-route/show-route.component';
import {RatingComponent} from './rating/rating.component';
import {MyRoutesComponent} from './my-routes/my-routes.component';
import {
  MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSnackBarModule, MatSliderModule,
  MatTabsModule, MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatTooltipModule, MatChipsModule
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
import {UserDataService} from '../user-data/user-data.service';
import {UsernameDialogComponent} from './login/username-dialog/username-dialog.component';
import {FileService} from '../files/file.service';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {LoginDialogService} from '../authentication/login-dialog.service';
import {MediaDialogComponent} from './media-dialog/media-dialog.component';
import {ForgotComponent} from './login/forgot-password-dialog/forgot.component';
import {InstantSearchService} from '../instantsearch/instantsearch.service';
import {StarRatingComponent} from './star-rating/star-rating.component';
import {DifficultyIndicatorComponent} from './difficulty-indicator/difficulty-indicator.component';
import {RouteOverviewCardComponent} from './route-overview-card/route-overview-card.component';
import {HttpClientModule} from '@angular/common/http';
import {MetaUiComponent} from './meta-ui/meta-ui.component';
import {ImageComponent} from './image/image.component';

const appRoutes: Routes = [
  { path: '', component: AllRoutesComponent },
  { path: 'routes/create', component: CreateRouteComponent },
  { path: 'routes/:id', component: ShowRouteComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    AllRoutesComponent,
    LoginComponent,
    ListRoutesComponent,
    RouteComponent,
    CreateRouteComponent,
    ShowRouteComponent,
    MapComponent,
    RouteUIComponent,
    PoiUIComponent,
    RatingComponent,
    MyRoutesComponent,
    UsernameDialogComponent,
    MediaDialogComponent,
    ForgotComponent,
    StarRatingComponent,
    DifficultyIndicatorComponent,
    RouteOverviewCardComponent,
    MetaUiComponent,
    ImageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
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
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
    HttpClientModule,
  ],
  entryComponents: [LoginComponent, UsernameDialogComponent, MediaDialogComponent, ForgotComponent, MetaUiComponent],
  providers: [
    AuthenticationService,
    RouteService,
    RatingService,
    PoiService,
    UserDataService,
    FileService,
    LoginDialogService,
    InstantSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
