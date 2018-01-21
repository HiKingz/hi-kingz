import {Component, Input} from '@angular/core';
import {Route} from '../../routes/route.model';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-route-overview-card',
  templateUrl: './route-overview-card.component.html',
  styleUrls: ['./route-overview-card.component.css']
})
export class RouteOverviewCardComponent {
  public Math: any = Math;

  @Input()
  public route: FirebaseItem<Route>;

  constructor(private _router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'hiking',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/hiking.svg')
    );
  }

  public openRoute(): void {
    this._router.navigate(['/routes/' + this.route.id]);
  }
}
