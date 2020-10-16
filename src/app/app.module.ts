import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import { SimpleModalComponent } from './will/simple-modal/simple-modal.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { WillModule } from './will/will.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { AddEppComponent } from './add-epp/add-epp.component';
import { CustomerComponent } from './customers/customer.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AddEppComponent,
    CustomerComponent,    
    NavMenuComponent,
    SimpleModalComponent,
    Error404Component,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    ProductModule,
    WillModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
