import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CuadroComponent } from './cuadro/cuadro.component';
import { MapaComponent } from './mapa/mapa.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LugarComponent } from './lugar/lugar.component';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AppRoutingModule,
    CuadroComponent,
    MapaComponent,
    NavbarComponent,
    LugarComponent
  ],
  exports:[
    CuadroComponent,
    MapaComponent,
    NavbarComponent,
    LugarComponent
  ]
})
export class SharedModule { }
