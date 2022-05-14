import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "../utils/material-modules.module";
import { HomeComponent } from './components/home/home.component';
import { PersonaggiComponent } from './components/personaggi/personaggi.component';
import { HttpClientModule } from "@angular/common/http";
import { PersonaggioDetailComponent } from './components/personaggio-detail/personaggio-detail.component';
import {StorageModule} from "./components/personaggi/store/storage.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonaggiComponent,
    PersonaggioDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
