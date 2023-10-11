import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Detalle } from 'src/app/cine/detalles/interfaces/detalle.interface';
import { DetalleService } from 'src/app/cine/detalles/services/detalle.service';

@Component({
  selector: 'app-list-peliculas',
  templateUrl: './list-peliculas.component.html',
})
export class ListPeliculasComponent implements OnInit {
  constructor(private peliculaService: PeliculaService) {}

  peliculas: Pelicula[] = [];
  detalle!: Detalle;
  ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe((resp) => {
      this.peliculas = resp;
    });
  }

  removePelicula(id: number) {
    Swal.fire({
      title: 'Está seguro que desea eliminar el elemento?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.peliculaService
          .removePelicula(id)

          .subscribe({
            next: () => {
              Swal.fire(
                'Película eliminada!',
                'La película ha sido eliminada.',
                'success'
              );

              this.peliculas = this.peliculas.filter((item) => item.id !== id);
            },

            error: (err: any) => {
              console.log('Error', err);
              Swal.fire(
                'Error eliminando película!!',
                'La película no  puede ser  eliminada.',
                'error'
              );
            },
          });
      }
    });
  }
}
