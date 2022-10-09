import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ExtraUdfComponent } from './components/main/extra-udf/extra-udf.component';
import { HomeComponent } from './components/main/home/home.component';
import { PromoSignagePrintComponent } from './components/main/promo-signage-print/promo-signage-print.component';
import { PromoSignageComponent } from './components/main/promo-signage/promo-signage.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'promo-signage',
    component: PromoSignageComponent
  },
  {
    path: 'promo-signage-print',
    component: PromoSignagePrintComponent
  },
  {
    path: 'extra-udf',
    component: ExtraUdfComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
