import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ErrorPage2Component } from './components/error-page2/error-page2.component';
import { ForgotPassFormComponent } from './components/forgot-pass-form/forgot-pass-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginComponent } from './components/login/login.component';




const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: ':: Epic :: Log In' }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: ':: Epic :: Forgot Password' }
  },{
    path: 'error-404',
    component: ErrorPageComponent,
    data: { title: ':: Epic :: Error-404' }
  },
  {
    path: 'error-500',
    component: ErrorPage2Component,
    data: { title: ':: Epic :: Error-500' }
  },
  {
    path: 'forgot-pass-forms',
    component: ForgotPassFormComponent,
    data: { title: ':: forgot-pass-forms' }
  },
  {
    path: 'admin',
    component: LoginAdminComponent,
    data: { title: ':: Admin Login' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    ForgotPasswordComponent
  ];

}