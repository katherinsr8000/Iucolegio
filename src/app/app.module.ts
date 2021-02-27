import { BrowserModule } from '@angular/platform-browser';
import {Component} from '@angular/core';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { indexComponent } from './Gestion Colegio/index.component';
import {FormsModule, ReactiveFormsModule} from'@angular/forms';
import { BrowserAnimationsModule , NoopAnimationsModule} from '@angular/platform-browser/animations';
import { formatNumber } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PdfMakeWrapper } from 'pdfmake-wrapper';

@NgModule({
  declarations: [
    AppComponent,
    indexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule, 
    MatTabsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
