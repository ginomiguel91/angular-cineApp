import { Detalle } from 'src/app/cine/detalles/interfaces/detalle.interface';

export interface Pelicula {
  id: number;
  titulo: string;
  duracion: number;
  clasificacion: string;
  genero: string;
  imagen: string;
  fechaEstreno: Date;
  estatus: string;
  detalle: Detalle;
}
