import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Cafeteria } from 'src/app/models/cafeteria';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor() { }
}
