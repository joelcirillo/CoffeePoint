import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { ReseñaRoutingModule } from './reseña-routing.module';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    ReseñaRoutingModule

  ],
exports: [
  PagesComponent
]

})
export class ReseñaModule {}
