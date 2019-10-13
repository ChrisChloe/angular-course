import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css']
})
export class StatusCardComponent implements OnInit {

  @Input() cardTitle: string;
  @Input() cardIcon: string;
  @Input() status: boolean;

  constructor() { }

  ngOnInit() {
  }

}
