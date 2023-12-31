import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
{
  path:"",component:HomeComponent
},
{
  path:"",loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
},
{
  path:"",loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)
},
{
  path:"",loadChildren:()=>import('./modules/nosotros/nosotros.module').then(m=>m.NosotrosModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
