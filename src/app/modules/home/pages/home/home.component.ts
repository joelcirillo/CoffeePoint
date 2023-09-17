import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  ocultarComponente: boolean = false;
  esconderComponente() {
    this.ocultarComponente = true; // Ocultar el componente

  }
  mostrarComponente() {
    this.ocultarComponente = false; // Mostrar el componente
  }
}
