import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { Cafeteria } from "../../../../models/cafeteria";
import { CrudService } from '../../service/crud.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


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
  ocultarMapa: boolean = false;
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
    this.ocultarMapa = true;
    this.ocultarImagen = false;
    this.ocultarMenuGeneral = true;
    this.ocultarMenuPersonal = true;
    this.ocultarCafe = false;
    this.ocultarBotonMenuGeneral = true;
    this.ocultarBotonMenuPersonal = false;
    this.ocultarBotonResenas = false;
    this.ocultarResenas = true;

  }
  volver() {
    this.ocultarMapa = false;
    this.ocultarImagen = true;
    this.ocultarMenuGeneral = true;
    this.ocultarMenuPersonal = true;
    this.ocultarCafe = false;
    this.ocultarBotonMenuGeneral = false;
    this.ocultarBotonMenuPersonal = true;
    this.ocultarBotonResenas = true;
    this.ocultarResenas = true;

  }
  mostrarMenuGeneral() {
    this.ocultarMapa = false;
    this.ocultarImagen = true;
    this.ocultarMenuGeneral = false;
    this.ocultarMenuPersonal = true;
    this.ocultarCafe = true;
    this.ocultarBotonMenuGeneral = false;
    this.ocultarBotonMenuPersonal = true;
    this.ocultarBotonResenas = true;
    this.ocultarResenas = true;

  }
  mostrarMenuPersonal() {
    this.ocultarMapa = true;
    this.ocultarImagen = false;
    this.ocultarMenuGeneral = true;
    this.ocultarMenuPersonal = false;
    this.ocultarCafe = true;
    this.ocultarBotonMenuGeneral = true;
    this.ocultarBotonMenuPersonal = false;
    this.ocultarBotonResenas = false;
    this.ocultarResenas = true;

  }
  mostrarCafeterias() {
    this.ocultarBotonResenas = true;
    this.ocultarMapa = false;
    this.ocultarMenuGeneral = true;
    this.ocultarCafe = false;
    this.ocultarImagen = true;
    this.ocultarMenuPersonal = true;
    this.ocultarBotonMenuPersonal = true;
    this.ocultarBotonMenuGeneral = false;
    this.ocultarResenas = true;

  }
  mostrarResenas() {
    this.ocultarBotonResenas = true;
    this.ocultarMapa = true;
    this.ocultarMenuGeneral = true;
    this.ocultarCafe = true;
    this.ocultarImagen = false;
    this.ocultarMenuPersonal = true;
    this.ocultarBotonMenuPersonal = false;
    this.ocultarBotonMenuGeneral = true;
    this.ocultarResenas = false;

  }
  // volver() {
  //   this.ocultarComponente = false; // Ocultar el componente
  //   this.ocultarImagen = true;
  //   this.ocultarMenuGeneral = true;
  //   this.ocultarCafe = false;
  //   this.ocultarMenuPersonal = true;
  //   this.ocultarBotonMenuPersonal = true;
  //   this.ocultarBotonMenuGeneral = false;
  //   this.ocultarBotonResenas = true;
  //   this.ocultarResenas = true;
  //   this.ocultarBotonResenas = true;
  // }
  // mostrarMenuGeneral() {
  //   this.ocultarBotonResenas = true;
  //   this.ocultarComponente = false; // Ocultar el componente principal
  //   this.ocultarImagen = true; // Mostrar la imagen de volver

  //   // Ahora, establece las variables para mostrar el cuadro correcto según tu lógica
  //   this.ocultarCafe = true;
  //   this.ocultarMenuGeneral = false;
  //   this.ocultarMenuPersonal = true;
  //   this.ocultarBotonResenas = true;
  //   this.ocultarResenas = true;

  // }
  // mostrarMenuPersonal() {
  //   this.ocultarComponente = true; // Ocultar el componente principal
  //   this.ocultarImagen = false; // Mostrar la imagen de volver

  //   // Ahora, establece las variables para mostrar el cuadro correcto según tu lógica
  //   this.ocultarCafe = true;
  //   this.ocultarMenuGeneral = true;
  //   this.ocultarMenuPersonal = false;
  //   this.ocultarResenas = true;


  // }
  // mostrarCafeterias() {
  //   this.ocultarBotonResenas = true;
  //   this.ocultarComponente = false;
  //   this.ocultarMenuGeneral = true;
  //   this.ocultarCafe = false;
  //   this.ocultarImagen = true;
  //   this.ocultarMenuPersonal = true;
  //   this.ocultarBotonMenuPersonal = true;
  //   this.ocultarBotonMenuGeneral = false;
  //   this.ocultarResenas = true;
  // }
  // mostrarResenas() {
  //   this.ocultarComponente = true;
  //   this.ocultarImagen = false;
  //   this.ocultarCafe = true;
  //   this.ocultarMenuGeneral = true;
  //   this.ocultarMenuPersonal = true;
  //   this.ocultarResenas = false;


  // }


  constructor(
    // llamamos servicio Crud
    private servicioCrud: CrudService,
    public dialog: MatDialog,
    
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
          alert("Ha agregado una nueva cafetería con éxito :)");
        })
        .catch(error => {
          alert("Hubo un error al cargar la cafetería :( \n" + error);
        })
    }
  }
  //mostrar botones
  mostrarEditar(cafeteriaSeleccionada: any) {
    this.cafeteriaSeleccionada = cafeteriaSeleccionada;
    this.cafeteria.setValue({
      nombre: cafeteriaSeleccionada.nombre,
      imagen: cafeteriaSeleccionada.imagen,
      descripcion: cafeteriaSeleccionada.descripcion,
      direccion: cafeteriaSeleccionada.direccion,
    })


  }

  mostrarBorrar(cafeteriaSeleccionada: any) { //mostrar
    this.modalVisibleProducto = true;
    this.cafeteriaSeleccionada = cafeteriaSeleccionada;
  }
  //funcion del editar
  editarCafeteria() {
    let datos: Cafeteria = {
      idCafeteria: this.cafeteriaSeleccionada.idCafeteria,
      nombre: this.cafeteria.value.nombre!,
      imagen: this.cafeteria.value.imagen!,
      descripcion: this.cafeteria.value.descripcion!,
      direccion: this.cafeteria.value.direccion!
    }
    this.servicioCrud.modificarCafeteria(this.cafeteriaSeleccionada.idCafeteria, datos)
      .then(producto => {
        alert("La cafeteria fue modificada con exito.");
      })
      .catch(error => {
        alert("No se pudo modificar la cafeteria \n" + error)
      })
  }
  borrarCafeteria() {
    this.servicioCrud.eliminarCafeteria(this.cafeteriaSeleccionada.idCafeteria)
      .then(respuesta => {
        alert("La cafeteria se ha eliminado con exito.");
      })
      .catch(error => {
        alert("No se ha podido eliminar la cafeteria: \n" + error)
      })
  }
  //mostrar prducto particular
  modalVisible: boolean = false;

  mostrarVer(info: Cafeteria) {
    // va a ser para el botón ver más
    this.modalVisible = true;

    // asignamos la información del producto seleccionado
    this.cafeteriaSeleccionada = info;
  }

  // función para mostrar esos productos específicos
    // Reemplaza Cafeteria con la estructura de datos real

  // Función para obtener los datos de la cafetería por su ID
  mostrarCafeteriaSeleccionada(id: string) {
    this.servicioCrud.obtenerCafeteriaPorId(id).subscribe(
      (cafeteria: any) => {
        this.cafeteriaSeleccionada = cafeteria;
      },
      (error) => {
        console.error('Error al obtener la cafetería', error);
      }
    );
  }
}
