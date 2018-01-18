import {Component, Input, OnInit} from '@angular/core';
import {RatingAggregation} from '../../commons/models/rateable';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit{
  @Input()
  public rating: RatingAggregation;
  @Input()
  public readOnly = true;

  public displayedRating = 0;

  public ngOnInit(): void {
    this.displayedRating = this.rating && this.rating.avg || 0;
  }

  public displayRating(value: number): void {
    if (!this.readOnly) {
      this.displayedRating = value;
    }
  }

  private clicked() {
    this.rating.avg = this.displayedRating;
  }

  private mouseLeave() {
    this.displayedRating = this.rating.avg;
  }
}
