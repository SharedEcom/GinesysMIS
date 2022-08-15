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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/statics/toast/toast.component';
import { ItemInfoComponent } from './components/main/common/modal/item-info/item-info/item-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    PromoSignageComponent,
    ExtraUdfComponent,
    PromoSignagePrintComponent,
    CommingSoonComponent,
    ToastComponent,
    ItemInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }),
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
