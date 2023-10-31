import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true; //para el input

  usuarios: Usuario={
    uid: '',
    nombre: '',
    email:'',
    rol:'',
    contrasena:'',
  }

  uid='';


 //creamos una nueva coleccion para usuarios
  coleccionUsuarios: Usuario[] = [];


 // servicioAuth referencia a nuestro servicio Auth
 constructor(
  public servicioAuth: AuthService, 
  public servicioFirestore: FirestoreService,
  public router: Router
  ) {
}

//tomamos nuevos registros y mostramos los resultados 
async registrarse (){
  const credenciales ={
    email: this.usuarios.contrasena
  }
}

}
