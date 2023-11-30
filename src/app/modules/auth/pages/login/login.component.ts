import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // función iniciar sesión
import { FirestoreService } from 'src/app/shared/services/firestore.service'; // nos trae los datos
import { Usuario } from 'src/app/models/usuario'; // interfaz usuario
import { Router } from '@angular/router'; // navegación


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  usuarios: Usuario = {
    uid: '',
    nombre: '',
    email: '',
    rol: '',
    contrasena: '' 
  }

  constructor(
    public servicioAuth: AuthService,
    public firestore: FirestoreService,
    public router: Router
  ){}
  esAdmin: boolean = false;
  async iniciar(){
    const credenciales = {
      email: this.usuarios.email,
      contrasena: this.usuarios.contrasena,
    }

    const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.contrasena)
    try {
      // Iniciar sesión
      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.contrasena);
  
      if (res) {
        alert("Se ha logueado con éxito :D");
  
        // Obtener información del usuario después de iniciar sesión
        // const userLogeado = await this.servicioAuth.auth.currentUser;
        // if (userLogeado) {
        //   const usuario = await this.servicioAuth.obtenerUsuario(userLogeado.uid).toPromise();
        //   console.log(usuario); // Aquí tienes la información del usuario logueado
        //   if (usuario && usuario.rol === 'admin') {
        //     this.esAdmin = true;
        //   } else {
        //     this.esAdmin = false;
        //   }
        // }
      }
    } catch (error) {
      alert("Hubo un error al iniciar sesión :( \n " + error);
    }
  }

  // función para CERRAR SESIÓN
  // async salir(){
  //   const res = await this.servicioAuth.cerrarSesion()
  //   .then(res => {
  //     alert("Ha cerrado sesión con éxito.");
  //     console.log(res);

  //     this.router.navigate(['/inicio']);
  //   })
  // }
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

