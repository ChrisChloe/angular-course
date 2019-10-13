import { Router, NavigationStart, NavigationEnd, NavigationError, Event } from '@angular/router';
import { Component, OnInit, HostListener, OnChanges, SimpleChanges, SimpleChange, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { showSidebar, collapse } from '../../helpers/animations/animations';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  animations: [showSidebar]
})

export class RootComponent implements OnInit {

  public sidebarOpened: boolean = false;
  public navIsFixed: boolean

  public showLoadingScreen: boolean;

  constructor(private router: Router, private shareData: ShareDataService) {

    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) this.sidebarOpened = false;

    });

  }


  ngOnInit() {
    this.shareData.loadingScreenEvent.subscribe(res => this.showLoadingScreen = res);


    
  }

  public openSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }






}
