import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { Authentication } from './services/auth.service';

import { AppComponent } from './app.component';
import { BannerComponent } from './access/banner/banner.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { AccessComponent } from './access/access.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
    AccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [ Authentication ],
  bootstrap: [AppComponent]
})
export class AppModule { }
