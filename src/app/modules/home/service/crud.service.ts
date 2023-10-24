import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Cafeteria } from 'src/app/models/cafeteria';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private cafeteriaColeccion: AngularFirestoreCollection<Cafeteria>
  constructor(private database: AngularFirestore) {
    this.cafeteriaColeccion = database.collection('cafeterias')
   }
   // función para CREAR PRODUCTO
  crearCafeteria(cafeteria: Cafeteria){
    return new Promise(async(resolve, reject) =>{
      try{
        const id = this.database.createId();
        cafeteria.idCafeteria = id;

        const resultado = await this.cafeteriaColeccion.doc(id).set(cafeteria);

        resolve(resultado);
      } catch (error){
        reject(error);
      }
    })
  }
}
