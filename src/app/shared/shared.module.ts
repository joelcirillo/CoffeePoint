import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuadroComponent } from './cuadro/cuadro.component';
import { MapaComponent } from './mapa/mapa.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LugarComponent } from './lugar/lugar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    CuadroComponent,
    MapaComponent,
    NavbarComponent,
    LugarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports:[
    CuadroComponent,
    MapaComponent,
    NavbarComponent,
    LugarComponent
  ]
})
export class SharedModule { }
