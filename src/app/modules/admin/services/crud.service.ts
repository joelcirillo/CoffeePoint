import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private productosColeccion: AngularFirestoreCollection<Producto>

  constructor(private database: AngularFirestore) {
    this.productosColeccion = database.collection('productos')
  }

  // función para CREAR PRODUCTO
  crearProducto(producto: Producto){
    return new Promise(async(resolve, reject) =>{
      try{
        const id = this.database.createId();
        producto.idProducto = id;

        const resultado = await this.productosColeccion.doc(id).set(producto);

        resolve(resultado);
      } catch (error){
        reject(error);
      }
    })
  }

  obtenerProducto(){
    // snapshoot -> captura los cambios
    // pipe -> tubería por dónde viajan esos nuevos datos
    // map -> recorre esos datos, los lee
    return this.productosColeccion.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  // función para EDITAR PRODUCTO
  /*Envíamos el id del producto seleccionado y su nueva información*/
  modificarProducto(idProducto: string, nuevaData: Producto){
    return this.database.collection('productos').doc(idProducto).update(nuevaData)
  }

  // función para ELIMINAR PRODUCTO
  eliminarProducto(idProducto: string){
    return new Promise((resolve, reject) => {
      try{
        const resp = this.productosColeccion.doc(idProducto).delete()
        resolve (resp)
      }
      catch(error){
        reject(error)
      }
    })
  }
}
