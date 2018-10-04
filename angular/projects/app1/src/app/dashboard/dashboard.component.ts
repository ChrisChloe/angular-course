import { Component, OnInit } from '@angular/core';

import { Sentence } from '../shared/sentence.model';
import { SENTENCES } from './sentences-mock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public sentences : Sentence[] = SENTENCES;

  constructor() { console.log(this.sentences); }

  ngOnInit() {
  }

}
