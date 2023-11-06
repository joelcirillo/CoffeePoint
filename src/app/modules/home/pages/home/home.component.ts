import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { Cafeteria } from "../../../../models/cafeteria";
import { CrudService } from '../../service/crud.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';


//leaflet
import * as L from 'leaflet';
import { latLng, tileLayer, marker, icon } from 'leaflet';
import { Populares } from 'src/app/models/populares';
import { Resena } from "src/app/models/resena";


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
  coleccionPopulares: Populares[] = [];
  coleccionResena: Resena[] = [];
  cafeteriaSeleccionada!: Cafeteria; // ! -> toma valores vacíos
  popularSeleccionado!: Populares;
  resenaSeleccionada!: Resena;
  resenasCafeteria: any[] = [];
  nuevoPuntaje: number =0;
  nuevaResena: string= '';
  menusCafeteria: any[] = [];
  nuevoPrecio: number = 0;
  nuevaComida: string = '';
  idCafeteriaSeleccionada: string = '';


  modalVisibleProducto: boolean = false;
  // ENLAZA NUESTRO FORMULARIO
  cafeteria = new FormGroup({
    nombre: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required)
  })
  //enlaza formulario de populares
  populares = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    comida: new FormControl('', Validators.required),
  })
  //enlaza formulario de reseñas
  resena = new FormGroup({
    resena: new FormControl('', Validators.required),
    puntuacion: new FormControl('', Validators.required),
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
  ocultarBotonPopulares: boolean= true;
  ocultarBotonAgregar: boolean= false;
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
    this.ocultarBotonPopulares= true;
    this.ocultarBotonAgregar= true;

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
    this.ocultarBotonPopulares= true;
    this.ocultarBotonAgregar= false;
    

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
    this.ocultarBotonPopulares= false;
    this.ocultarBotonAgregar= true;

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
    this.ocultarBotonPopulares= true;
    this.ocultarBotonAgregar= true;

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
    this.ocultarBotonPopulares= true;
    this.ocultarBotonAgregar= false;

  }
  mostrarResenas() {
    this.ocultarBotonResenas = false;
    this.ocultarMapa = true;
    this.ocultarMenuGeneral = true;
    this.ocultarCafe = true;
    this.ocultarImagen = false;
    this.ocultarMenuPersonal = true;
    this.ocultarBotonMenuPersonal = false;
    this.ocultarBotonMenuGeneral = true;
    this.ocultarResenas = false;
    this.ocultarBotonPopulares= true;
    this.ocultarBotonAgregar= true;

  }
  


  constructor(
    // llamamos servicio Crud
    private servicioCrud: CrudService,
    public dialog: MatDialog,
    
  ) { }


  ngOnInit() {
    this.obtenerCafeterias();
    this.obtenerPopulares();
    this.obtenerResenas();
  }
  //funcionalidad para populares
  async agregarPopulares() {
    if (this.populares.valid) {
      let nuevaPopulares: Populares = {
        idPopulares: '', // único que guardamos vacío; lo creamos en el CRUD
        nombre:  this.populares.value.nombre!,
        comida: this.populares.value.comida!,
        precio:this.populares.value.precio! ,
      };

      // ENVIAMOS NUESTRO NUEVO PRODUCTO
      await this.servicioCrud.crearPopulares(nuevaPopulares)
        .then(populares => {
          alert("Ha agregado una nueva comida popular con exito :)");
        })
        .catch(error => {
          alert("Hubo un error al cargar la comida popular:( \n" + error);
        })
    }
  }
  mostrarBorrarPopulares(popularSeleccionado: any) { //mostrar
    this.modalVisibleProducto = true;
    this.popularSeleccionado = popularSeleccionado;
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
  obtenerPopulares() {
    this.servicioCrud.obtenerPopulares().subscribe(
      (populares: any[]) => {
        this.coleccionPopulares= populares;
      },
      (error) => {
        console.error('Error al obtener populares: ', error);
      }
    );
  }
  obtenerResenas() {
    this.servicioCrud.obtenerResenas().subscribe(
      (resenas: any[]) => {
        this.coleccionResena = resenas;
      },
      (error) => {
        console.error('Error al obtener cafeterías: ', error);
      }
    );
  }
  
  borrarPopulares() {
    this.servicioCrud.eliminarPopulares(this.popularSeleccionado.idPopulares)
      .then(respuesta => {
        alert("La comida popular se elimino con exito");
      })
      .catch(error => {
        alert("No se ha podido eliminar la comida popular \n" + error)
      })
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
  //mostrar reseña
  mostrarResenasdeCafeteriaSeleccionada(idCafeteria: string) {
    this.servicioCrud
      .obtenerResenasdeCafeterias(idCafeteria)
      .subscribe(resenas => {
        this.resenasCafeteria= resenas;
      });
  }
  //agregar reseñas
  seleccionarCafeteria(idCafeteria: string) {
    this.idCafeteriaSeleccionada = idCafeteria;
  }
  agregarResena(idCafeteria: string) {
    console.log('ID de la cafetería seleccionada:', idCafeteria);
    this.servicioCrud.crearResena(idCafeteria, this.nuevoPuntaje, this.nuevaResena);
    this.nuevoPuntaje = 0; // Restablece el puntaje después de agregar la reseña
    this.nuevaResena = ''; 
  }
  //eliminar reseñas
  eliminarResena(idCafeteria: string, idResena: string) {
    this.servicioCrud.eliminarResena(idCafeteria, idResena)
      .then(respuesta => {
        alert("La cafeteria se ha eliminado con exito.");
      })
      .catch(error => {
        alert("No se ha podido eliminar la cafeteria: \n" + error)
      })
    
  }
  //mostrar menu
  mostrarMenudeCafeteriaSeleccionada(idCafeteria: string) {
    this.servicioCrud
      .obtenerMenuCafeteria(idCafeteria)
      .subscribe(menus => {
        this.menusCafeteria= menus;
      });
  }
  agregarMenu(idCafeteria: string) {
    console.log('ID de la cafetería seleccionada:', idCafeteria);
    this.servicioCrud.crearMenu(idCafeteria, this.nuevaComida, this.nuevoPrecio);
    this.nuevoPrecio = 0; // Restablece el precio después de agregar el elemento al menú
    this.nuevaComida = ''; // Borra el nombre de la comida después de agregarla al menú
  }

 
  }

