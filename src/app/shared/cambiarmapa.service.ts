import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CambiarmapaService {
<<<<<<< HEAD
  private mostrarMapa = true;

  toggleContent() {
    this.mostrarMapa = !this.mostrarMapa;
  }

  mostrarLugar() {
    return this.mostrarMapa;
  }
=======

  constructor() { }
>>>>>>> 58f6084a9eade26ddec63a38ea7e4c5e6962c4dd
}
