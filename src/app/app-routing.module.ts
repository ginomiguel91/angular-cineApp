import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'detalles',
    loadChildren: () => import('./cine/cine.module').then((m) => m.CineModule),
  },
  {
    path: 'peliculas',
    loadChildren: () =>
      import('./pelicula/pelicula.module').then((m) => m.PeliculaModule),
  },

  {
    path: 'horarios',
    loadChildren: () =>
      import('./horario/horario.module').then((m) => m.HorarioModule),
  },
  {
    path: '**',
    redirectTo: 'peliculas',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
