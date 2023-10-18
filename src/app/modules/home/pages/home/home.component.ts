import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //definir que mostrar y que no
  ocultarComponente: boolean = false;
  ocultarImagen: boolean = true;
  ocultarMenuGeneral: boolean = true;
  ocultarMenuPersonal: boolean = true;
  ocultarCafe: boolean = false;
  ocultarBotonMenuGeneral: boolean = false;
  ocultarBotonMenuPersonal: boolean = true;
  ocultarBotonResenas: boolean = true;
  ocultarResenas: boolean = true;
  //primera cafeteria
  mostrarCafeteria() {
    this.ocultarComponente = true; // Ocultar el componente
    this.ocultarImagen = false;
    this.ocultarBotonMenuGeneral = true;
    this.ocultarBotonMenuPersonal = false;
    this.ocultarBotonResenas = true;
    this.ocultarBotonResenas = false; //unico dejar

    this.ocultarResenas = true;

  }
  volver() {
    this.ocultarComponente = false; // Ocultar el componente
    this.ocultarImagen = true;
    this.ocultarMenuGeneral = true;
    this.ocultarCafe = false;
    this.ocultarMenuPersonal = true;
    this.ocultarBotonMenuPersonal = true;
    this.ocultarBotonMenuGeneral = false;
    this.ocultarBotonResenas = true;
    this.ocultarResenas = true;
    this.ocultarBotonResenas = true;
  }
  mostrarMenuGeneral() {
    this.ocultarBotonResenas = true;
    this.ocultarComponente = false; // Ocultar el componente principal
    this.ocultarImagen = true; // Mostrar la imagen de volver

    // Ahora, establece las variables para mostrar el cuadro correcto según tu lógica
    this.ocultarCafe = false;
    this.ocultarMenuGeneral = false;
    this.ocultarMenuPersonal = true;
    this.ocultarBotonResenas = true;
    this.ocultarResenas = true;

  }
  mostrarMenuPersonal() {
    this.ocultarComponente = true; // Ocultar el componente principal
    this.ocultarImagen = false; // Mostrar la imagen de volver

    // Ahora, establece las variables para mostrar el cuadro correcto según tu lógica
    this.ocultarCafe = true;
    this.ocultarMenuGeneral = true;
    this.ocultarMenuPersonal = false;
    this.ocultarResenas = true;


  }
  mostrarCafeterias() {
    this.ocultarBotonResenas = true;
    this.ocultarComponente = false;
    this.ocultarMenuGeneral = true;
    this.ocultarCafe = false;
    this.ocultarImagen = true;
    this.ocultarMenuPersonal = true;
    this.ocultarBotonMenuPersonal = true;
    this.ocultarBotonMenuGeneral = false;
    this.ocultarResenas = true;
  }
  mostrarResenas() {
    this.ocultarComponente = true;
    this.ocultarImagen = false;
    this.ocultarCafe = true;
    this.ocultarMenuGeneral = true;
    this.ocultarMenuPersonal = true;
    this.ocultarResenas = false;


  }


}
