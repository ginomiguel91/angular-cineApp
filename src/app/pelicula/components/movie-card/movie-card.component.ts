import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;
  peliculas: Pelicula[] = [];
  @Input() pelicula!: Pelicula;
  @Output() eliminarPeliculaEvent: EventEmitter<number> =
    new EventEmitter<number>();

  emitirEliminarPelicula() {
    this.eliminarPeliculaEvent.emit(this.pelicula.id);
  }
}
