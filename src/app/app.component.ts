import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffee_point';
  constructor(private router: Router) { }

  cambiarMapa() {
    // Navegar a la ruta del nuevo componente
<<<<<<< HEAD
    this.router.navigate(['/home']);
=======
    this.router.navigate(['/lugar']);
>>>>>>> 58f6084a9eade26ddec63a38ea7e4c5e6962c4dd
  }
}
