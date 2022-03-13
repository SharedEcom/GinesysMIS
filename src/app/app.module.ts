import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/statics/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/main/home/home.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { PromoSignageComponent } from './components/main/promo-signage/promo-signage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    PromoSignageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
