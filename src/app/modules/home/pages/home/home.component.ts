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
import { Menu } from "src/app/models/menu";
import { ResenaCafeteria } from "src/app/models/resenascafeteria";


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
    //fija la vista inicial del mapa
    let map = L.map('map').setView([-38.93993532247614, -67.99217337786433], 13);

    
    L.marker([-38.93993532247614, -67.99217337786433], { icon: myIcon }).addTo(map);
  }

  //mapa leaflet
  ngAfterViewInit(): void {
    this.initializeMap();
  }
  private initializeMap(): void {
    const map = L.map('map').setView([-38.93993532247614, -67.99217337786433], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([-38.93993532247614, -67.99217337786433]).addTo(map)// poner variable
      .bindPopup('Plaza Var')
      .openPopup();
      L.marker([-38.938821187047125, -67.99516673862628]).addTo(map)// poner variable
      .bindPopup('Havanna')
      .openPopup();
      L.marker([-38.938307423125835, -67.99745297488013]).addTo(map)// poner variable
      .bindPopup('Bar 1946')
      .openPopup();
  }
  coleccionCafeteria: Cafeteria[] = [];
  coleccionPopulares: Populares[] = [];
  coleccionResena: Resena[] = [];
  coleccionMenu: Menu[] = [];
  cafeteriaSeleccionada!: Cafeteria; // ! -> toma valores vacíos
  popularSeleccionado!: Populares;
  resenaSeleccionada!: Resena;
  menuSeleccionado!:Menu;
  resenasCafeteria: any[] = [];
  nuevoPuntaje: number =0;
  nuevaResena: string= '';
  menusCafeteria: any[] = [];
  nuevoPrecio: number = 0;
  nuevaComida: string = '';
  idCafeteriaSeleccionada: string = '';


  modalVisibleProducto: boolean = false;
  // ENLAZA NUESTRO FORMULARIO
  //validator es para que no quede vacio el campo
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
    puntuacion: new FormControl(0, Validators.required),
  })
  menu = new FormGroup({
    comida: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
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
  ocultarBotonMenu: boolean= true;
  ocultarResultadosCafeteria: boolean= true;
  ocultarBarradeBusquedaCafe:boolean=false;
  //primera cafeteria
  mostrarCafeteria() {
    
    this.ocultarMapa = true;
    this.ocultarImagen = false;
    this.ocultarMenuGeneral = true;
    this.ocultarMenuPersonal = true;
    this.ocultarCafe = true;
    this.ocultarBotonMenuGeneral = true;
    this.ocultarBotonMenuPersonal = false;
    this.ocultarBotonResenas = false;
    this.ocultarResenas = false;
    this.ocultarBotonPopulares= true;
    this.ocultarBotonAgregar= true;
    this.ocultarBotonMenu= true;
    this.ocultarResultadosCafeteria= true;
    this.ocultarBarradeBusquedaCafe=true;

  }
  //retroseder
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
    this.ocultarBotonMenu= true;
    this.ocultarResultadosCafeteria= true;
    this.ocultarBarradeBusquedaCafe=false;
    

  }
  //mostrar populares
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
    this.ocultarBotonMenu= true;
    this.ocultarResultadosCafeteria= true;
    this.ocultarBarradeBusquedaCafe=true;

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
    this.ocultarBotonMenu= false;
    this.ocultarResultadosCafeteria= true;
    this.ocultarBarradeBusquedaCafe=true;

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
    this.ocultarBotonMenu= true;
    this.ocultarResultadosCafeteria= true;
    this.ocultarBarradeBusquedaCafe=false;

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
    this.ocultarBotonMenu= true;
    this.ocultarResultadosCafeteria= true;
    this.ocultarBarradeBusquedaCafe=true;

  }
  


  constructor(
    // llamamos servicio Crud
    private servicioCrud: CrudService,
    //modales
    public dialog: MatDialog,
    
  ) { }
  

  ngOnInit() {
//leer los datos 
    this.obtenerCafeterias();
    this.obtenerPopulares();
    this.obtenerResenas();
    this.obtenerMenu();
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
  mostrarEditarPopulares(popularSeleccionado: any) {
    this.popularSeleccionado = popularSeleccionado;
    this.populares.setValue({
      nombre: popularSeleccionado.nombre,
      comida: popularSeleccionado.comida,
      precio: popularSeleccionado.precio,
      
    })


  }
  editarPopulares() {
    let datos: Populares = {
      idPopulares: this.popularSeleccionado.idPopulares,
      nombre: this.populares.value.nombre!,
      comida: this.populares.value.comida!,
      precio:this.populares.value.precio!
      
    }
    this.servicioCrud.modificarPopulares(this.popularSeleccionado.idPopulares, datos)
      .then(producto => {
        alert("La comida popular fue modificada con exito.");
      })
      .catch(error => {
        alert("No se pudo modificar la comida popular \n" + error)
      })
  }
  //opciones principal cafeteria
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
  obtenerMenu() {
    this.servicioCrud.obtenerMenu().subscribe(
      (menus: any[]) => {
        this.coleccionMenu = menus;
      },
      (error) => {
        console.error('Error al obtener menu: ', error);
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
        console.log(resenas)
      });
  }
  //agregar reseñas
  seleccionarCafeteria(idCafeteria: string) {
    this.idCafeteriaSeleccionada = idCafeteria;
  }
  agregarResena(idCafeteria: string) {
    console.log('ID de la cafetería seleccionada:', idCafeteria);
    const resenas: Resena = { idResena: '', puntuacion: this.nuevoPuntaje, resena: this.nuevaResena };
    this.servicioCrud.crearResena(idCafeteria, this.nuevoPuntaje, this.nuevaResena, resenas);
    this.nuevoPuntaje = 0; // Restablece el puntaje después de agregar la reseña
    this.nuevaResena = ''; 
  }
  //editar reseñas
  mostrarEditarResena(resenaSeleccionada: any) {
    this.resenaSeleccionada = resenaSeleccionada;
    this.resena.setValue({
      puntuacion: this.resenaSeleccionada.puntuacion,
      resena: this.resenaSeleccionada.resena,
      
    });
    console.log("editar reseña modal visible")
  }
 

  editarResena() {
    let datos: Resena = {
      idResena: this.resenaSeleccionada.idResena,
      resena: this.resena.value.resena!,
      puntuacion: this.resena.value.puntuacion!,
      
    }

    // Llama a la función de edición de reseña en tu servicio CRUD
    this.servicioCrud.modificarResena(this.cafeteriaSeleccionada.idCafeteria, this.resenaSeleccionada.idResena, datos)
      .then((resultado) => {
        // Realiza acciones adicionales si es necesario
        console.log("Reseña editada con éxito");
      })
      .catch((error) => {
        // Maneja el error de acuerdo con la lógica de tu aplicación
        console.error("Error al editar la reseña:", error);
      });
  }

  //eliminar reseñas
  modalVisibleResena: boolean = false;
  mostrarBorrarResena(resenaSeleccionada: any) {
    this.modalVisibleResena = true;
    this.resenaSeleccionada = resenaSeleccionada;
  }
  borrarResena(){
    console.log(this.idCafeteriaSeleccionada, this.resenaSeleccionada.idResena)
    console.log("La función borrarResena se está ejecutando");
    this.servicioCrud.eliminarResena(this.idCafeteriaSeleccionada, this.resenaSeleccionada.idResena)
      .then((resultado) => {
        // Realiza acciones adicionales si es necesario
      })
      .catch((error) => {
        // Maneja el error de acuerdo con la lógica de tu aplicación
      });
  }
  //mostrar menu
  mostrarMenudeCafeteriaSeleccionada(idCafeteria: string) {

    this.servicioCrud
      .obtenerMenuCafeteria(idCafeteria)
      .subscribe(menu => {
        this.menusCafeteria= menu;
        console.log(menu)
      });
  }
  agregarMenu(idCafeteria: string) {
    console.log('ID de la cafetería seleccionada:', idCafeteria);
    const menus: Menu = { idMenu: '', precio: this.nuevoPrecio, comida: this.nuevaComida };
    this.servicioCrud.crearMenu(idCafeteria, this.nuevoPrecio, this.nuevaComida, menus);
    this.nuevoPrecio = 0; // Restablece el puntaje después de agregar la reseña
    this.nuevaComida = ''; 
  }
  borrarMenu(){
    console.log(this.idCafeteriaSeleccionada, this.menuSeleccionado.idMenu)
    console.log("La función borrar Menu se está ejecutando");
    this.servicioCrud.eliminarMenu(this.idCafeteriaSeleccionada, this.menuSeleccionado.idMenu)
      .then((resultado) => {
        // Realiza acciones adicionales si es necesario
      })
      .catch((error) => {
        // Maneja el error de acuerdo con la lógica de tu aplicación
      });
  }
  editarMenu() {
    let datos: Menu = {
      idMenu: this.menuSeleccionado.idMenu,
      comida: this.menu.value.comida!,
      precio: this.menu.value.precio!,
      
    }

    // Llama a la función de edición de reseña en tu servicio CRUD
    this.servicioCrud.modificarMenu(this.cafeteriaSeleccionada.idCafeteria, this.menuSeleccionado.idMenu, datos)
      .then((resultado) => {
        // Realiza acciones adicionales si es necesario
        console.log("Menu editado con éxito");
      })
      .catch((error) => {
        // Maneja el error de acuerdo con la lógica de tu aplicación
        console.error("Error al editar el menu:", error);
      });
  }
  mostrarEditarMenu(menuSeleccionado: any) {
    this.menuSeleccionado = menuSeleccionado;
    this.menu.setValue({
      precio: this.menuSeleccionado.precio,
      comida: this.menuSeleccionado.comida,
      
    });
    console.log("editar menu modal visible")
  }
  mostrarBorrarMenu(menuSeleccionado: any) {
    this.modalVisibleResena = true;
    this.menuSeleccionado = menuSeleccionado;
  }
  // promedio de reseñas
  calcularPromedio(resenasCafeteria: ResenaCafeteria[]) {
    let sum = 0;
    resenasCafeteria.forEach((resena) => {
      sum += resena.puntuacion;
    });
    return (sum / resenasCafeteria.length).toFixed(1);
  }
//funcion para buscar con la barra de busqueda
resultados: any[] = [];
  terminoBusqueda: string = '';
buscar() {
  this.ocultarBotonResenas = true;
  this.ocultarMapa = false;
  this.ocultarMenuGeneral = true;
  this.ocultarCafe = true;
  this.ocultarImagen = true;
  this.ocultarMenuPersonal = true;
  this.ocultarBotonMenuPersonal = true;
  this.ocultarBotonMenuGeneral = false;
  this.ocultarResenas = true;
  this.ocultarBotonPopulares= true;
  this.ocultarBotonAgregar= false;
  this.ocultarBotonMenu= true;
  this.ocultarResultadosCafeteria= false;
  this.ocultarBarradeBusquedaCafe= false;
  this.servicioCrud.buscarCafeterias(this.terminoBusqueda).subscribe(
    (resultados) => {
      this.resultados = resultados;
    },
    (error) => {
      console.error('Error al buscar', error);
    }
  );
}

 
  }

