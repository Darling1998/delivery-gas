import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  template: `
    <ion-icon *ngFor="let star of stars" [name]="getStarIconName(star)" (click)="rate(star)"></ion-icon>
  `,
  styles: [`
    ion-icon {
      font-size: 30px;
      color: gold;
      cursor: pointer;
    }
  `],
})
export class StarComponent  implements OnInit {

  @Input() maxStars: number = 5;
  @Input() initialRating: number = 0;
  @Input() readOnly: boolean = false;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: number[] = [];

  ngOnInit() {
    this.fillStars();
  }

  fillStars() {
    this.stars = Array.from({ length: this.maxStars }, (_, index) => index + 1);
  }

  getStarIconName(star: number): string {
    return star <= this.initialRating ? 'star' : 'star-outline';
  }

  rate(rating: number) {
    if (!this.readOnly) {
      this.initialRating = rating;
      this.ratingChange.emit(rating); // Emitimos el evento con la nueva calificación
    }
  }

}
