import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuadroComponent } from './cuadro/cuadro.component';
import { MapaComponent } from './mapa/mapa.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    CuadroComponent,
    MapaComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports:[
    CuadroComponent,
    MapaComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
