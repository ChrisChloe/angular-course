import { Heart } from '../shared/heart.model';
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.css']
})
export class AttemptsComponent implements OnInit {

  public emptyHeart = '/assets/empty-heart.png';
  public fullHeart = '/assets/full-heart.png';

  @Input() public attempts: number;

  public hearts: Heart[] = [
    new Heart(true), new Heart(true), new Heart(true)
  ];

  constructor() {
    console.log(this.hearts);
  }

  ngOnChanges() {

    if (this.attempts !== this.hearts.length) {
      let index = this.hearts.length - this.attempts;
      this.hearts[index - 1].full = false;
    }
    console.log('attempts received from panel: ', this.attempts);
  }

  ngOnInit() {
  }
}
