import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  mostrarComponente: boolean = true;
  mostrarImagen:boolean=false;
  ocultarComponente() {
    this.mostrarComponente = false;
    this.mostrarImagen = true; // Cambia la visibilidad del componente
  }
}
