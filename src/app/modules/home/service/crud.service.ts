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
    this.menuColeccion = database.collection('menu')
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
  async modificarResena(idCafeteria: string, idResena: string, nuevaData: Resena) {
    try {
      return this.database.collection('cafeterias').doc(idCafeteria).collection('resenas').doc(idResena).update(nuevaData)

    } catch (error) {
      throw error;
    }
  }

  
    //funciones menu
    obtenerMenu(): Observable<Menu[]> {
      return this.menuColeccion.valueChanges();
    }
    obtenerMenuCafeteria(idCafeteria: string): Observable<any[]> {
      return this.database
        .collection('cafeterias')
        .doc(idCafeteria)
        .collection('menu')
        .valueChanges();
    }
    async crearMenu(idCafeteria: string, nuevoPrecio: number, nuevaComida: string, menus: Menu) {
  try {
    const id = this.database.createId(); // Verifica si createId() está funcionando como se espera
    menus.idMenu = id;
    console.log(id);
    console.log(menus);
    const resultado = await this.cafeteriaColeccion.doc(idCafeteria).collection('menu').doc(id).set(menus);
  } catch (error) {
    throw error;
  }
}
    // async crearMenu(idCafeteria: string, nuevoPrecio: number, nuevaComida: string, menus: Menu) {
    //   try {
    //     const id = this.database.createId();
    //     menus.idMenu = id;
    //     console.log(id)
    //     console.log(menus)
    //     const resultado = await this.cafeteriaColeccion.doc(idCafeteria).collection('menu').doc(id).set(menus);
    
        
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    async eliminarMenu(idCafeteria: string, idMenu: string) {
      try {
        const resp = await this.cafeteriaColeccion.doc(idCafeteria).collection('menu').doc(idMenu).delete();
        return resp;
      } catch (error) {
        throw error;
      }
     
    }
    async modificarMenu(idCafeteria: string, idMenu: string, nuevaData: Menu) {
      try {
        return this.database.collection('cafeterias').doc(idCafeteria).collection('menu').doc(idMenu).update(nuevaData)
  
      } catch (error) {
        throw error;
      }
    }
 //funcion para buscar cafeterias
 buscarCafeterias(termino: string): Observable<any[]> {
  // Realiza la consulta a Firestore
  return this.database
    .collection('cafeterias', (ref) =>
      ref
        .where('nombre', '>=', termino)
        .where('nombre', '<=', termino + '\uf8ff')
    )
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
}
 
 
}
