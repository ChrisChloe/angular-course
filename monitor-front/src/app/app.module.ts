import { TableComponent } from './helpers/generic-components/table-component/table.component';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token/token.interceptor.service';
import { AuthGuardService } from './services/auth/auth-guard.service';

import { WordWrapPipe } from './pipes/word-wrap.pipe';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { Ng2OdometerModule } from 'ng2-odometer';




//Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { NotificationComponent } from './helpers/notification/notification.component';
import { LoggedUsersComponent } from './components/pages/logged-users/logged-users-list/logged-users-list.component';
import { CreateComponent } from './components/pages/logged-users/create/create.component';
import { LateOpsComponent } from './components/pages/late-ops/late-ops-list/late-ops.component';
import { LoggedUsersShowComponent } from './components/pages/logged-users/logged-users-show/logged-users-show.component';
import { StatusCardComponent } from './helpers/generic-components/status-card/status-card.component';
import { IssuesListComponent } from './components/pages/issues/issues-list/issues-list.component';
import { CountCardComponent } from './helpers/generic-components/count-card/count-card.component';
import { DashboardCrmComponent } from './components/pages/dashboard-crm/dashboard-crm.component';
import { CompanyCardComponent } from './helpers/generic-components/company-card/company-card.component';
//Directives

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RootComponent,
    LoginComponent,
    DashboardComponent,
    NotificationComponent,
    TableComponent,
    WordWrapPipe,
    CreateComponent,
    LoggedUsersComponent,
    LateOpsComponent,
    LoggedUsersShowComponent,
    StatusCardComponent,
    IssuesListComponent,
    CountCardComponent,
    DashboardCrmComponent,
    CompanyCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDQ0G4qkGpSsjEdBVgCFuF33p34wfjDuOo'
    }),
    AgmJsMarkerClustererModule,
    Ng2OdometerModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
