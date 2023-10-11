import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPeliculasComponent } from './pages/list-peliculas/list-peliculas.component';
import { ShowPeliculaComponent } from './pages/show-pelicula/show-pelicula.component';
import { AddPeliculaComponent } from './pages/add-pelicula/add-pelicula.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPeliculasComponent,
      },
      {
        path: 'add',
        component: AddPeliculaComponent,
      },
      {
        path: ':id',
        component: ShowPeliculaComponent,
      },
      {
        path: 'edit/:id',
        component: AddPeliculaComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeliculaRoutingModule {}
