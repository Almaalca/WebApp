import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {Login} from './Component/Login/login.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
     Login
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ Login]
})
export class AppModule { }
