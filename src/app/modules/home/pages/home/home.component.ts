import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  ocultarComponente: boolean = false;
  ocultarImagen:boolean=true;
  esconderComponente() {
    this.ocultarComponente = true; // Ocultar el componente
    this.ocultarImagen=false;

  }
  volver(){
     this.ocultarComponente = false; // Ocultar el componente
    this.ocultarImagen=true;
  }
  
}
