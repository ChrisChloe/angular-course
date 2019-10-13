import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {

  @Input() company;

  constructor() { }

  ngOnInit() {
  }


  public getCiaLogo(cia: string): string {
    cia = cia.toLowerCase();
    return `url(assets/companies/${cia}-logo-full.png)`;
  }

}
