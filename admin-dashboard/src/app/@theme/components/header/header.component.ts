import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AuthService } from './../../../services/auth/auth.service';
import { TicketService } from './../../../services/ticket/ticket.service';



@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  ticketQty: number;
  dropdown = false;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' , data: { id: 'logout' }  }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: AuthService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private ticketService: TicketService) {
  }

  ngOnInit() {
    this.user = this.authService.getDataUser();
    this.ticketService.getTickets().subscribe((response: any) => {
      this.ticketQty = response.data.length;
    });
  }

  openDropdown () {
    if (this.dropdown === true) {
      this.dropdown = false;
    } else {
      this.dropdown = true;
    }
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleTicketSidebar() {
    this.sidebarService.toggle(false, 'settings-sidebar');
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
