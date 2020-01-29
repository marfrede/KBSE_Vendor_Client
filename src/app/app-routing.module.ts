import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferListComponent } from "./components/offer-list/offer-list.component";
import { OfferDetailComponent } from "./components/offer-detail/offer-detail.component";
import { OfferNewComponent } from "./components/offer-new/offer-new.component";
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'all', component: OfferListComponent},
  {path: 'offer/:id', component: OfferDetailComponent},
  {path: 'new', component: OfferNewComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
