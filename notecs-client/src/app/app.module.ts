import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from "./shared-components/toolbar/toolbar.component";
import { LoginComponent } from './landing/login/login.component';
import { MaterialModule } from './material/material.module';
import { SignupComponent } from './landing/signup/signup.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarComponent,
    MaterialModule
], 
providers:[
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }

],
  bootstrap: [AppComponent]
})
export class AppModule { }
