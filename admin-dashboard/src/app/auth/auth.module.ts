
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from './../../environments/environment';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';
import { NgxConfirmAccountComponent } from './confirm-account/confirm-account.component';


const baseUrl = environment.API_URL;
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent,
    NgxRequestPasswordComponent,
    NgxConfirmAccountComponent,
  ],
})
export class NgxAuthModule {}
