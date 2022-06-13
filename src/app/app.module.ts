import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/statics/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/main/home/home.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { PromoSignageComponent } from './components/main/promo-signage/promo-signage.component';
import { ExtraUdfComponent } from './components/main/extra-udf/extra-udf.component';
import { PromoSignagePrintComponent } from './components/main/promo-signage-print/promo-signage-print.component';
import { CommingSoonComponent } from './components/statics/comming-soon/comming-soon.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    PromoSignageComponent,
    ExtraUdfComponent,
    PromoSignagePrintComponent,
    CommingSoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
