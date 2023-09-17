import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CambiarmapaService {
  private mostrarMapa = true;

  toggleContent() {
    this.mostrarMapa = !this.mostrarMapa;
  }

  mostrarLugar() {
    return this.mostrarMapa;
  }
}
