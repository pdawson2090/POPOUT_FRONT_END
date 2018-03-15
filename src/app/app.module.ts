import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { SidebarModule } from 'primeng/sidebar';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AppRoutesModule } from './app-routes.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapComponent } from './map/map.component';
import { EventService } from './services/event.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PageNotFoundComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCCLK3i1TBLm_tUGc0_OkRFmAlih6GWBqo'
    }),
    AgmSnazzyInfoWindowModule,
    FormsModule,
    HttpClientModule,
    SidebarModule
    //BrowserAnimationsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
