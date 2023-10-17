import { Component, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula.interface';

@Component({
  selector: 'app-movie-card-simple',
  templateUrl: './movie-card-simple.component.html',
  styleUrls: ['./movie-card-simple.component.css'],
})
export class MovieCardSimpleComponent {
  @Input() pelicula!: Pelicula;
}
