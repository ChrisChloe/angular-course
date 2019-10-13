import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { TestDashboardComponent } from './test-dashboard/test-dashboard.component';
import { TradeComponent } from './trade/trade.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { TicketChatComponent } from './tickets/ticket-chat/ticket-chat.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: TestDashboardComponent,
      },
      {
        path: 'broker',
        loadChildren: './broker/broker.module#BrokerModule',
      },
      {
        path: 'plans',
        loadChildren: './plans/plans.module#PlansModule',
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
      },
      {
        path: 'trade',
        component: TradeComponent,
      },
      {
        path: 'ticket/:id',
        component: TicketChatComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
