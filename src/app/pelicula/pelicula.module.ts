import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { ListPeliculasComponent } from './pages/list-peliculas/list-peliculas.component';
import { ShowPeliculaComponent } from './pages/show-pelicula/show-pelicula.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPeliculaComponent } from './pages/add-pelicula/add-pelicula.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { MovieCardSimpleComponent } from './components/movie-card-simple/movie-card-simple.component';

@NgModule({
  declarations: [
    ListPeliculasComponent,
    ShowPeliculaComponent,
    AddPeliculaComponent,
    MovieCardComponent,
    MovieCardSimpleComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PeliculaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [MovieCardComponent, MovieCardSimpleComponent],
})
export class PeliculaModule {}
