import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styles: [
    `
      .movie-card {
        max-width: 400px;
      }
      .movie-header-image {
        background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5WhG7GwDnmRbSQsjjde0Vpbur5mdjmkTh9-cdBIEvQZyXOo3dUcpQ-5W3CljEpFGsIKM&usqp=CAU');
        background-size: cover;
      }
    `,
  ],
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
