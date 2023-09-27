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

    this.router.navigate(['/home'])

  }
}
