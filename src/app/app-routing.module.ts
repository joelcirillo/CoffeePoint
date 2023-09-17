import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './shared/mapa/mapa.component';
<<<<<<< HEAD



const routes: Routes = [
  { path: 'mapa', component: MapaComponent },

=======
import { LugarComponent } from './shared/lugar/lugar.component';


const routes: Routes = [
  { path: 'mapa', component: MapaComponent },
  { path: 'lugar', component: LugarComponent },
>>>>>>> 58f6084a9eade26ddec63a38ea7e4c5e6962c4dd
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
