import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//se importa el environment
import { environment } from "src/environments/environment";
//se importa modulos de firebase
import {AngularFireModule} from'@angular/fire/compat'; //importacion del firebase (base de datos de la nube)
import {AngularFireAuthModule} from'@angular/fire/compat/auth'; //importacion de la autentificacion 
import {AngularFireStorageModule} from'@angular/fire/compat/storage'; //importacion del storage (img)
import { SharedModule } from './shared/shared.module';

import { HomeComponent } from './modules/home/pages/home/home.component';
@NgModule({

  declarations: [
    AppComponent,
    HomeComponent,
  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
