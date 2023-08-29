import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MapaComponent } from './components/mapa/mapa.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MapaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    MapaComponent
  ]
})
export class SharedModule { }
