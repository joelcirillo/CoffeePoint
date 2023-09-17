import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  //definir que mostrar y que no
  ocultarComponente: boolean = false;
  ocultarImagen:boolean=true;
  ocultarMenuGeneral: boolean=true;
  ocultarMenuPersonal:boolean=true;
  ocultarCafe:boolean=false;
  ocultarBotonMenuGeneral:boolean=false;
  ocultarBotonMenuPersonal:boolean=true;
  mostrarCafeteria() {
    this.ocultarComponente = true; // Ocultar el componente
    this.ocultarImagen=false;
    this.ocultarBotonMenuGeneral = true;
    this.ocultarBotonMenuPersonal = false;

  }
  volver(){
     this.ocultarComponente = false; // Ocultar el componente
    this.ocultarImagen=true;
    this.ocultarMenuGeneral = true;
    this.ocultarCafe=false;
    this.ocultarMenuPersonal= true;
    this.ocultarBotonMenuPersonal=true;
    this.ocultarBotonMenuGeneral=false;
  }
  mostrarMenuGeneral(){
    this.ocultarComponente = false; // Ocultar el componente principal
  this.ocultarImagen = true; // Mostrar la imagen de volver

  // Ahora, establece las variables para mostrar el cuadro correcto según tu lógica
  this.ocultarCafe = false;
  this.ocultarMenuGeneral = false;
  this.ocultarMenuPersonal = true;
    
  }
  mostrarMenuPersonal(){
    this.ocultarComponente = true; // Ocultar el componente principal
  this.ocultarImagen = false; // Mostrar la imagen de volver

  // Ahora, establece las variables para mostrar el cuadro correcto según tu lógica
  this.ocultarCafe = true;
  this.ocultarMenuGeneral = true;
  this.ocultarMenuPersonal = false;
    
  }
  mostrarCafeterias(){
    this.ocultarComponente = false;
    this.ocultarMenuGeneral = true;
    this.ocultarCafe = false;
    this.ocultarImagen= true;
    this.ocultarMenuPersonal= true;
    this.ocultarBotonMenuPersonal=true;
    this.ocultarBotonMenuGeneral=false;
  }

  
}
