import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { SharedModule } from './shared/shared.module';
=======
//se importa el environment
import { environment } from "src/environments/environment";
//se importa modulos de firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth"; 
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
>>>>>>> 61862e25c56e67404adadbf3d667ade1e549abec

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    SharedModule
=======
    //llamando modulos firebase,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule
>>>>>>> 61862e25c56e67404adadbf3d667ade1e549abec
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
