import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureComponent } from './modules/core/components/feature/feature.component';
import { MyInterceptor } from './modules/core/intersepter/intersepter.service';
import { SharedModule } from './modules/shared/shared-models/shared/shared.module';
import { DeletePopupComponent } from './modules/shared/component/delete-popup/delete-popup.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
      {prefix: "assets/translate/modules/client/header/", suffix: ".json"},
      {prefix: "assets/translate/modules/client/leftmenu/", suffix: ".json"},
      {prefix: "assets/translate/modules/crm/crmCompont/product-family-form/", suffix: ".json"},
      {prefix: "assets/translate/modules/number/numberComponent/", suffix: ".json"}
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    FeatureComponent,
    DeletePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
  
  ],
  exports:[TranslateModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
