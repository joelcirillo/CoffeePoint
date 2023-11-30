import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true; // esto es del input

  usuario: Usuario = {
    uid: '',
    nombre: '',
    email: '',
    rol: '',
    contrasena: ''
  }

  uid = '';

  // creamos una nueva colección para usuarios
  coleccionUsuarios: Usuario[] = [];

  // servicioAuth referencia a nuestro servicio Auth
  constructor(
    public servicioAuth: AuthService, 
    public servicioFirestore: FirestoreService,
    public router: Router
    ) {
  }

  // tomamos nuevos registros y mostramos los resultados
  async registrarse() {
    const credenciales = {
      email: this.usuario.email,
      contrasena: this.usuario.contrasena
    };

    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.contrasena)
    // el método THEN nos devuelve el mismo valor que guarda la promesa
    .then(res =>{
      alert("Ha agregado un nuevo usuario con éxito :)");

      this.router.navigate(['/inicio']);
    })
    // el método CATCH creará un error en caso de que las cosas salgan mal
    .catch(error => 
      alert("Hubo un error al cargar el usuario :( \n"+error)
    );

    const uid = await this.servicioAuth.getUid();

    this.usuario.uid = uid;

    // GUARDA EL NUEVO USUARIO
    this.guardarUser();
  }

  // función que agrega NUEVO USUARIO
  async guardarUser(){
    this.servicioFirestore.agregarUsuario(this.usuario, this.usuario.uid)
    .then(res => {
      console.log(this.usuario)
    })
    .catch(error =>{
      console.log('Error =>', error)
    })
  }

  async ngOnInit(){
    const uid = await this.servicioAuth.getUid();
    console.log(uid);
  }
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}