import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/statics/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/main/home/home.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { ExtraUdfComponent } from './components/main/extra-udf/extra-udf.component';
import { PromoSignagePrintComponent } from './components/main/promo-signage-print/promo-signage-print.component';
import { CommingSoonComponent } from './components/statics/comming-soon/comming-soon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/main/common/toast/toast.component';
import { ItemInfoComponent } from './components/main/common/modal/item-info/item-info.component';
import { SiteListComponent } from './components/main/common/modal/site-list/site-list.component';
import { PromoSignageComponent } from './components/main/promo-signage/promo-signage.component';
import { FootfallComponent } from './components/main/footfall/footfall.component';
import { AgGridModule } from 'ag-grid-angular';

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
    ItemInfoComponent,
    SiteListComponent,
    FootfallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    // AgGridModule.ag-AgGridModule (null), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
