import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  icon: string;
  label: string;
  sublabel: string;
  route: string;

}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {

  gifService = inject(GifsService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Gifs populares del momento',
      route: 'trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      sublabel: 'Busca tus gifs favoritos',
      route: 'search',
    }
  ]



}
