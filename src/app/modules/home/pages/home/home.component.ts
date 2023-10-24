import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cafeteria } from "../../../../models/cafeteria";
import { CrudService } from '../../service/crud.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  //icono personalizado del leaflet
  //mapa leaflet
  ngAfterViewInit(): void {
    this.initializeMap();
  }
  private initializeMap(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('¡Hola, este es un marcador de ejemplo!')
      .openPopup();
  }
  coleccionCafeteria: Cafeteria[] = [];

  cafeteriaSeleccionada!: Cafeteria; // ! -> toma valores vacíos

  modalVisibleProducto: boolean = false;
   // ENLAZA NUESTRO FORMULARIO
  cafeteria = new FormGroup({
    nombre: new FormControl('',Validators.required),
    imagen: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required)
  })
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

  constructor(
    // llamamos servicio Crud
    public servicioCrud: CrudService
  ){}
  //funcion de agregar ela cafeteria
  async agregarCafeteria(){
    if (this.cafeteria.valid){
      let nuevaCafeteria: Cafeteria = {
        idCafeteria: '', // único que guardamos vacío; lo creamos en el CRUD
        direccion: this.cafeteria.value.direccion!,
        nombre: this.cafeteria.value.nombre!,
        imagen: this.cafeteria.value.imagen!,
        descripcion: this.cafeteria.value.descripcion!,
      };

      // ENVIAMOS NUESTRO NUEVO PRODUCTO
      await this.servicioCrud.crearCafeteria(nuevaCafeteria)
      .then(cafeteria => {
        alert("Ha agregado un nuevo producto con éxito :)");
      })
      .catch(error => {
        alert("Hubo un error al cargar el nuevo producto :( \n"+error);
      })
    }
  }

}
