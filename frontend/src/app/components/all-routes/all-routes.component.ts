import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import {hits} from 'instantsearch.js/es/widgets';
import {searchBox} from 'instantsearch.js/es/widgets';
import {rangeSlider} from 'instantsearch.js/es/widgets';
import {starRating} from 'instantsearch.js/es/widgets';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrls: ['./all-routes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllRoutesComponent implements OnInit {

  constructor(public router: Router) {}

  public goToCreateRoute() {
    this.router.navigate(['/routes/create']);
  }

  ngOnInit() {
    const search = instantsearch({
      appId: 'FN552M4GBM',
      apiKey: '6d3baf4c1604a87d3a8d245f7040cd0e',
      indexName: 'hi-kingz.routes',
      urlSync: true
    });

    search.addWidget(
      searchBox({
        container: '#search-box',
        placeholder: 'Search for hiking routes. Where do you wanna go? How much can you handle?'
      })
    );
    search.addWidget(
      hits({
        container: '#hits'
      })
    );
    search.addWidget(
      rangeSlider({
        container: '#difficulty-slider',
        attributeName: 'difficulty',
        tooltips: false,
        autoHideContainer: false,
        min: 1,
        max: 5,
        step: 1
      })
    );
    search.addWidget(
      starRating({
        container: '#rating-stars',
        attributeName: 'ratingAggregation.avg',
        autoHideContainer: false,
        max: 5
      })
    );

    search.start();
  }
}
