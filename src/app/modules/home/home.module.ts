import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';

import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrimeraComponent } from './pages/primera/primera.component';


@NgModule({
  declarations: [
    HomeComponent,
    PrimeraComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
