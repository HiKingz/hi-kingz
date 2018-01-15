import {Component, Input} from '@angular/core';
import {RatingAggregation} from '../../commons/models/rateable';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input()
  public rating: RatingAggregation;

  constructor() {}
}
