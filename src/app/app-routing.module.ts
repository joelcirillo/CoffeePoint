import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './shared/mapa/mapa.component';
import { LugarComponent } from './shared/lugar/lugar.component';

const routes: Routes = [
  { path: 'mapa', component: MapaComponent },
  { path: 'lugar', component: LugarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
