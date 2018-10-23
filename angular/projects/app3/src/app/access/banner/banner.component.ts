import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Images } from './image.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden <=> visible', animate('0.7s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public state = 'visible';

  public images: Images[] = [
    {state: 'hidden', url: '../../../assets/banner-access/img_1.png'},
    {state: 'visible', url: '../../../assets/banner-access/img_2.png'},
    {state: 'hidden', url: '../../../assets/banner-access/img_3.png'},
    {state: 'hidden', url: '../../../assets/banner-access/img_4.png'},
    {state: 'hidden', url: '../../../assets/banner-access/img_5.png'}
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.rotationLogic(), 3000);

  }

  public rotationLogic(): void {

    let idx: number;

    for (let i = 0; i <= 4; i++) {
      if (this.images[i].state === 'visible') {
        this.images[i].state = 'hidden';

        idx = i === 4 ? 0 : i + 1;

        break;
      }
    }

    this.images[idx].state = 'visible';
    setTimeout(() => this.rotationLogic(), 3000);
  }
}
