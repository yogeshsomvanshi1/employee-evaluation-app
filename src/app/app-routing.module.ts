import { LayoutCrmComponent } from './modules/core/components/layout-main/layout-crm.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPassFormComponent } from './modules/authentication/components/forgot-pass-form/forgot-pass-form.component';
import { PreloadModulesStrategy } from './modules/core/strategies/preload-module.strategy';
import { FeatureComponent } from './modules/core/components/feature/feature.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'forgot-pass-forms', component: ForgotPassFormComponent },
  { path: 'auth', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthModule) },
  { path: 'performance', loadChildren: () => import('./modules/performance/performance.module').then(m => m.PerformanceModule) } ,
  // { path: '**', redirectTo: 'performance' , pathMatch:'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadModulesStrategy, useHash: true, relativeLinkResolution: 'legacy' }),],
  exports: [RouterModule],
  providers: [PreloadModulesStrategy]
})
export class AppRoutingModule { }
