import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { Cafeteria } from "../../../../models/cafeteria";
import { CrudService } from '../../service/crud.service';
import { MatIconModule } from '@angular/material/icon';
//leaflet
import * as L from 'leaflet';
import { latLng, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  //icono personalizado del leaflet

  private initMap(): void {
    let myIcon = L.icon({
      iconUrl: 'assets/custom-icon.png', // Ruta a tu imagen personalizada en la carpeta de assets
      iconSize: [38, 95], // Tamaño del icono
      iconAnchor: [22, 94], // Punto de anclaje del icono
      popupAnchor: [-3, -76] // Punto donde aparecerá el popup en relación con el icono
    });

    let map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    L.marker([51.5, -0.09], { icon: myIcon }).addTo(map);
  }

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
    nombre: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required)
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
  // cafeteria: FormGroup;

  // constructor(private formBuilder: FormBuilder, private cafeteriaService: CrudService) {
  //   this.cafeteria = this.formBuilder.group({
  //     nombre: '',
  //     direccion: '',
  //     imagen: '',
  //     descripcion: ''
  //   });
  // }

  // // Método para agregar la cafetería a la base de datos
  // agregarCafeteria() {
  //   const newCafeteria = this.cafeteria.value;
  //   this.cafeteriaService.addCafeteria(newCafeteria)
  //     .then(() => {
  //       console.log('Cafetería agregada exitosamente');
  //     })
  //     .catch((error) => {
  //       console.error('Error al agregar cafetería: ', error);
  //     });
  // }

  constructor(
    // llamamos servicio Crud
    public servicioCrud: CrudService
  ) { }
  ngOnInit() {
    this.obtenerCafeterias();
  }

  obtenerCafeterias() {
    this.servicioCrud.obtenerCafeterias().subscribe(
      (cafeterias: any[]) => {
        this.coleccionCafeteria = cafeterias;
      },
      (error) => {
        console.error('Error al obtener cafeterías: ', error);
      }
    );
  }

  //funcion de agregar ela cafeteria
  async agregarCafeteria() {
    if (this.cafeteria.valid) {
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
          alert("Hubo un error al cargar el nuevo producto :( \n" + error);
        })
    }
  }
  //mostrar botones
  mostrarEditar(cafeteriaSeleccionada:Cafeteria){
    this.cafeteriaSeleccionada= cafeteriaSeleccionada;
    this.cafeteria.setValue({
      nombre:cafeteriaSeleccionada.nombre,
      imagen:cafeteriaSeleccionada.imagen,
      descripcion:cafeteriaSeleccionada.descripcion,
      direccion:cafeteriaSeleccionada.direccion,

    })
    

  }
  mostrarBorrar(cafeteriaSeleccionada:Cafeteria){ //mostrar
    this.modalVisibleProducto= true;
    this.cafeteriaSeleccionada=this.cafeteriaSeleccionada;
  }
  editarProducto(){
    let datos: Cafeteria = {
      idCafeteria: this.cafeteriaSeleccionada.idCafeteria,
      nombre: this.cafeteria.value.nombre!,
      imagen: this.cafeteria.value.imagen!,
      descripcion: this.cafeteria.value.descripcion!,
      direccion: this.cafeteria.value.direccion!
    }
    this.servicioCrud.modificarCafeteria(this.cafeteriaSeleccionada.idCafeteria, datos)
    .then(cafeteria=>{
      alert("el producto fue modificado con exito.");
    })
    .catch(error=>{
      alert("No se pudo modificar el producto \n"+error)
    })
  }

}
