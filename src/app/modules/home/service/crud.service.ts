import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Cafeteria } from 'src/app/models/cafeteria';
import { Observable } from 'rxjs';
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
  constructor(private database: AngularFirestore) {
    this.cafeteriaColeccion = database.collection('cafeterias')
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
  
}
