import {Component, Input} from '@angular/core';
import {Route} from '../../routes/route.model';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-route-overview-card',
  templateUrl: './route-overview-card.component.html',
  styleUrls: ['./route-overview-card.component.css']
})
export class RouteOverviewCardComponent {
  @Input()
  public route: Route;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'hiking',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/hiking.svg')
    );
  }

  public openRoute() {
    // TODO
    console.log('open route');
  }
}
