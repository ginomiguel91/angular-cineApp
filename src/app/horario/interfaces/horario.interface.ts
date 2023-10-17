import { Pelicula } from 'src/app/pelicula/interfaces/pelicula.interface';

export interface Horario {
  id: number;
  fecha: Date;
  hora: string;
  sala: string;
  precio: number;
  pelicula: Pelicula;
}
