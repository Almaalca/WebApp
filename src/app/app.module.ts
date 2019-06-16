import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import{AppComponent} from './app.component'
import {Login} from './Component/Login/login.component';
import {Datagrid} from './Component/Datagrid/datagrid.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
     AppComponent,Login,Datagrid
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
