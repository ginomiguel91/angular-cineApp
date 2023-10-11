import { Component } from '@angular/core';
import {
  faCoffee,
  faPlusCircle,
  faList,
  faSearch,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
export interface Menu {
  ruta: string;
  texto: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  faList = faList;
  faPlusCircle = faPlusCircle;
  faSearch = faSearch;
  menuItems: Menu[] = [
    {
      ruta: '/detalles/list',
      texto: 'Detalles de películas',
      icon: faList,
    },
    {
      ruta: '/detalles/add',
      texto: 'Agregar detalle',
      icon: faPlusCircle,
    },
    {
      ruta: '/peliculas/add',
      texto: 'Agregar película',
      icon: faPlusCircle,
    },
    {
      ruta: '/peliculas/list',
      texto: 'Lista de películas',
      icon: faList,
    },
  ];
}
