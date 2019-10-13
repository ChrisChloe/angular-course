import { NgModule } from '@angular/core';

import { TicketChatComponent } from './tickets/ticket-chat/ticket-chat.component';
import { TicketListComponent } from './tickets/list-ticket/list-ticket.component';
import { PagesComponent } from './pages.component';

import { TestDashboardModule } from './test-dashboard/test-dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TradeModule } from './trade/trade.module';
import { UserModule } from './user/user.module';

const PAGES_COMPONENTS = [
  PagesComponent,
  TicketListComponent,
  TicketChatComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    UserModule,
    ThemeModule,
    TestDashboardModule,
    TradeModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
