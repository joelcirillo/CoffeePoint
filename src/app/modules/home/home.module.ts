import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';

import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrimeraComponent } from './pages/primera/primera.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeComponent,
    PrimeraComponent,

    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class HomeModule { }
