import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './authentication-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from '../core/intersepter/intersepter.service';
import { ForgotPassFormComponent } from './components/forgot-pass-form/forgot-pass-form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ErrorPage2Component } from './components/error-page2/error-page2.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,

  ],
  declarations: [
    ForgotPassFormComponent,
    LoginComponent,
    ErrorPageComponent,
    ErrorPage2Component,
    LoginAdminComponent
  ],
  providers: [AuthenticationService, { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },]
})
export class AuthModule { }