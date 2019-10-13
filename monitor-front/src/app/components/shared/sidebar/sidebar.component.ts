import { collapse, showSidebar } from './../../../helpers/animations/animations';
import { AuthService } from './../../../services/auth/auth.service';
import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
// import {SettingsService} from '../services/settings.service';
import { ROUTES } from './sidebar-routes.config';
import { listObjShow } from '../../../helpers/animations/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [collapse, showSidebar]
})
export class SidebarComponent implements OnInit {
  public menuItems: object;

  constructor(private authService: AuthService) {this.menuItems = ROUTES;}
  

  logout() {
    this.authService.logout();
  }



  ngOnInit() { 
    
  }
}
