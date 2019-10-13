import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.css']
})
export class CountCardComponent implements OnInit {

  @Input() cardCategory: string;
  @Input() cardCountValue: number | string;
  @Input() cardLastUpdate: any;
  @Input() countCardIcon: string;
  @Input() reactiveCounter: boolean;

  @Input() route: string;
  
  constructor() { }

  ngOnInit() {
  }

}
