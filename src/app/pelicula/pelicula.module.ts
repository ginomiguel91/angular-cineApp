import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { ListPeliculasComponent } from './pages/list-peliculas/list-peliculas.component';
import { ShowPeliculaComponent } from './pages/show-pelicula/show-pelicula.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPeliculaComponent } from './pages/add-pelicula/add-pelicula.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ListPeliculasComponent,
    ShowPeliculaComponent,
    AddPeliculaComponent,
    MovieCardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PeliculaRoutingModule,
    ReactiveFormsModule,
  ],
})
export class PeliculaModule {}
