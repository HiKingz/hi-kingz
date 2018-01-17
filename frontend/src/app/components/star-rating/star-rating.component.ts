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
  @Input()
  public canSet = false;

  // If there has been a click, stop "following" the cursor until the span is left again
  private hasSet = false;

  constructor() {}

  private setRating(num: number): void {
    if (this.canSet && !this.hasSet) {
      this.rating.avg = num;
    }
  }

  private clicked() {
    this.hasSet = true;
  }

  private mouseLeave() {
    this.hasSet = false;
  }
}
