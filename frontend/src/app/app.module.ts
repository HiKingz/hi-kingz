import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AllRoutesComponent } from './all-routes/all-routes.component';
import { LoginComponent } from './login/login.component';
import { ListRoutesComponent } from './list-routes/list-routes.component';
import { RouteComponent } from './route/route.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { MapComponent } from './map/map.component';
import { RatingComponent } from './rating/rating.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';


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
    MyRoutesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
