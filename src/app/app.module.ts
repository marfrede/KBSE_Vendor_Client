import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { OfferNewComponent } from './components/offer-new/offer-new.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarModule } from "ng-sidebar";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    OfferDetailComponent,
    OfferNewComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
