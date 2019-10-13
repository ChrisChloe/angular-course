import { UserModule } from './pages/user/user.module';
import { APP_BASE_HREF, CurrencyPipe, PercentPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

import { TokenInterceptor } from './services/token/token.interceptor';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { PlanService } from './services/plan/plan.service';
import { AdminService} from './services/admin/admin.service';
import { TicketService } from './services/ticket/ticket.service';
import { UserService } from './services/user/user.service';
import { BrokerService } from './services/broker/broker.service';
import { NotifyService } from './services/notify.service';
import { UserModalComponent } from './pages/user/modal-user/modal-user.component';


const SERVICES = [
  AuthGuardService,
  PlanService,
  AdminService,
  TicketService,
  UserService,
  BrokerService,
  NotifyService,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgxMaskModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    CurrencyPipe,
    PercentPipe,
    SERVICES,
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {
}
