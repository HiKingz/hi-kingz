import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {searchBox} from 'instantsearch.js/es/widgets';
import {rangeSlider} from 'instantsearch.js/es/widgets';
import {starRating} from 'instantsearch.js/es/widgets';
import {Router} from '@angular/router';
import {InstantSearchService} from '../../instantsearch/instantsearch.service';
import {InstantSearchManager} from '../../instantsearch/instantsearch-manager';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {Route} from '../../routes/route.model';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrls: ['./all-routes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllRoutesComponent implements OnInit {
  public instantSearchManager: InstantSearchManager = null;

  constructor(private _router: Router, private _instantSearchService: InstantSearchService) {}

  public goToCreateRoute() {
    this._router.navigate(['/routes/create']);
  }

  ngOnInit() {
    this._initInstantSearchManager();
  }

  private _initInstantSearchManager() {
    this.instantSearchManager = this._instantSearchService.buildInstantSearchManager('routes').addWidget(
      searchBox({
        container: '#search-box',
        placeholder: 'Search for hiking routes. Where do you wanna go? How much can you handle?',
        loadingIndicator: true,
        cssClasses: {
          root: ['search-box-container', 'full-width', 'mat-elevation-z2'],
          input: ['search-box-input']
        }
      })
    ).addWidget(
      rangeSlider({
        container: '#difficulty-slider',
        attributeName: 'difficulty',
        tooltips: false,
        autoHideContainer: false,
        min: 1,
        max: 5,
        step: 1
      })
    ).addWidget(
      starRating({
        container: '#rating-stars',
        attributeName: 'ratingAggregation.avg',
        autoHideContainer: false,
        max: 5
      })
    ).start();
  }

  public identifyRoute(index, route) {
    return route.objectID;
  }

  public getRouteFirebaseItemForResult(result: any): FirebaseItem<Route> {
    return new FirebaseItem<Route>('routes/' + result.objectID, Route.deserialize(result));
  }
}
