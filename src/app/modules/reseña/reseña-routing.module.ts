import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [

  {
    path:"",component: PagesComponent
  }

]
@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})

@NgModule({
  declarations: [],
  imports: []
})
export class ReseñaRoutingModule { }
