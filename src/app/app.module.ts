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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { MatButtonModule } from '@angular/material/button/typings/button-module';
import { MatDialogModule } from '@angular/material/dialog/typings/dialog-module';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,   
    NavMenuComponent,
    SimpleModalComponent,
    Error404Component,
    HomeComponent,
    ModalComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
   
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),

    WillModule,

    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
