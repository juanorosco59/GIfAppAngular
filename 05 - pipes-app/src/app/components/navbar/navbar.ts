import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {

  //Usar la configuración de rutas como datos


  routes = routes.map(routePepito => ({

    title: routePepito.title ?? '',
    path: routePepito.path ?? '',

  }))



}
