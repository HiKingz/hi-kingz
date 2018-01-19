import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit{
  @Input()
  public rating: number;
  @Input()
  public readOnly = true;
  @Output()
  public ratingUpdated: EventEmitter<number> = new EventEmitter<number>();
  public displayedRating = 0;

  public ngOnInit(): void {
    this.displayedRating = this.rating || 0;
  }

  public displayRating(value: number): void {
    if (!this.readOnly) {
      this.displayedRating = value;
    }
  }

  private clicked() {
    this.rating = this.displayedRating;
    this.ratingUpdated.emit(this.rating);
  }

  private mouseLeave() {
    this.displayedRating = this.rating;
  }
}
