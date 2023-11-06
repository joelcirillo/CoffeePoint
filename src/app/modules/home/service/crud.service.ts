import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Cafeteria } from 'src/app/models/cafeteria';
import { Observable } from 'rxjs';
import { Populares } from 'src/app/models/populares';
import { Resena } from 'src/app/models/resena';
import { Menu } from "src/app/models/menu";
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // private coleccion: AngularFirestoreCollection<Cafeteria>

  // constructor(private database: AngularFirestore) { 
  //   //addCafeteria(cafeteria: any) {
  //     this.firestore.collection('cafeterias').add(cafeteria);
  //   //}
  // }

  // Método para agregar una cafetería a la base de datos

  private cafeteriaColeccion: AngularFirestoreCollection<Cafeteria>
  private popularesColeccion: AngularFirestoreCollection<Populares>
  private resenaColeccion: AngularFirestoreCollection<Resena>
  private menuColeccion: AngularFirestoreCollection<Menu>
  constructor(private database: AngularFirestore) {
    this.cafeteriaColeccion = database.collection('cafeterias')
    this.popularesColeccion = database.collection('populares')
    this.resenaColeccion = database.collection('resenas')
    this.menuColeccion = database.collection('menus')
  }
 
  //funcion para llamar producto
  obtenerCafeterias(): Observable<Cafeteria[]> {
    return this.cafeteriaColeccion.valueChanges();
  }
  // función para CREAR PRODUCTO
  crearCafeteria(cafeteria: Cafeteria) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.database.createId();
        cafeteria.idCafeteria = id;

        const resultado = await this.cafeteriaColeccion.doc(id).set(cafeteria);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
    
  }
  //funcion para modificar cafeteria
  modificarCafeteria(idCafeteria: string, nuevaData: Cafeteria){
    return this.database.collection('cafeterias').doc(idCafeteria).update(nuevaData)
  }
  eliminarCafeteria(idCafeteria: string){
    return new Promise((resolve, reject) => {
      try{
        const resp = this.cafeteriaColeccion.doc(idCafeteria).delete()
        resolve (resp)
      }
      catch(error){
        reject(error)
      }
    })
  }
  obtenerCafeteriaPorId(id: string): Observable<any> {
    return this.database.collection('cafeterias').doc(id).valueChanges();
  }
   //funcion para llamar populares
   obtenerPopulares(): Observable<Populares[]> {
    return this.popularesColeccion.valueChanges();
  }
  crearPopulares(populares: Populares) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.database.createId();
        populares.idPopulares = id;

        const resultado = await this.popularesColeccion.doc(id).set(populares);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
    
  }
  modificarPopulares(idPopulares: string, nuevaData: Populares){
    return this.database.collection('populares').doc(idPopulares).update(nuevaData)
  }
  eliminarPopulares(idPopulares: string){
    return new Promise((resolve, reject) => {
      try{
        const resp = this.popularesColeccion.doc(idPopulares).delete()
        resolve (resp)
      }
      catch(error){
        reject(error)
      }
    })
  }
  //funcion para llamar reseñas
  obtenerResenas(): Observable<Resena[]> {
    return this.resenaColeccion.valueChanges();
  }
  
  //funciones de reseñas
  obtenerResenasdeCafeterias(idCafeteria: string): Observable<any[]> {
    return this.database
      .collection('cafeterias')
      .doc(idCafeteria)
      .collection('resenas')
      .valueChanges();
  }
  async crearResena(idCafeteria: string, nuevoPuntaje: number, nuevaResena: string, resenas: Resena) {
    try {
      const id = this.database.createId();
      resenas.idResena = id;
      console.log(id)
      console.log(resenas)
      const resultado = await this.cafeteriaColeccion.doc(idCafeteria).collection('resenas').doc(id).set(resenas);
  
      
    } catch (error) {
      throw error;
    }
  }

  
  
  async eliminarResena(idCafeteria: string, idResena: string) {
    try {
      const resp = await this.cafeteriaColeccion.doc(idCafeteria).collection('resenas').doc(idResena).delete();
      return resp;
    } catch (error) {
      throw error;
    }
   
  }
  async editarResena(idCafeteria: string, idResena: string, nuevoPuntaje: number, nuevaResena: string) {
    try {
      await this.cafeteriaColeccion.doc(idCafeteria).collection('resenas').doc(idResena).update({puntuacion: nuevoPuntaje, resena: nuevaResena});
    } catch (error) {
      throw error;
    }
  }

  
    //funciones menu
    obtenerMenus(): Observable<Menu[]> {
      return this.menuColeccion.valueChanges();
    }
    obtenerMenuCafeteria(idCafeteria: string): Observable<any[]> {
      return this.database
        .collection('cafeterias')
        .doc(idCafeteria)
        .collection('menu')
        .valueChanges();
    }
    
    crearMenu(idCafeteria: string, nuevaComida: string, nuevoPrecio: number) {
      if (idCafeteria) {
        return this.database
          .collection('cafeterias')
          .doc(idCafeteria)
          .collection('menu')
          .add({ 
            comida: nuevaComida,
            precio: nuevoPrecio
          });
      } else {
        console.error('El ID de la cafetería está vacío.');
        throw new Error('El ID de la cafetería está vacío.');
      }
    }
 
 
}
