import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//se importa el environment
import { environment } from "src/environments/environment";
//se importa modulos de firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth"; 
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { HomeComponent } from './modules/home/pages/home/home.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';

// import { AuthModule } from './modules/auth/auth.module';

 //const routes:Routes=[
 // {path:'home', component:HomeComponent},
 //]
@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
  ],
  imports: [
    // RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    // AuthModule,
    //llamamos al shared module
    SharedModule,
    //llamando modulos firebase,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    CommonModule,
  ],
  exports:[
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
