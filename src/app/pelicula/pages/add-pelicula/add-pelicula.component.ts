import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Detalle } from 'src/app/cine/detalles/interfaces/detalle.interface';
import { DetalleService } from 'src/app/cine/detalles/services/detalle.service';
import Swal from 'sweetalert2';
import {
  faCheckDouble,
  faCancel,
  faAsterisk,
} from '@fortawesome/free-solid-svg-icons';

import { switchMap, tap } from 'rxjs';
import { Pelicula } from '../../interfaces/pelicula.interface';

@Component({
  selector: 'app-add-pelicula',
  templateUrl: './add-pelicula.component.html',
})
export class AddPeliculaComponent implements OnInit {
  faCheckDouble = faCheckDouble;
  faCancel = faCancel;
  faAsterisk = faAsterisk;
  detalles: Detalle[] = [];
  peliculaNew: Pelicula = {
    id: 0,
    titulo: '',
    duracion: 0,
    clasificacion: '',
    genero: '',
    fechaEstreno: new Date(),
    estatus: '',
    imagen: '',
    detalle: {
      id: 0,
      director: '',
      actores: '',
      sinopsis: '',
      trailer: '',
    },
  };

  detalleNew: Detalle = {
    id: 0,
    actores: '',
    sinopsis: '',
    director: '',
    trailer: '',
  };
  peliculaForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    duracion: ['', Validators.required],
    clasificacion: ['', Validators.required],
    genero: ['', Validators.required],
    imagen: ['', Validators.required],
    fechaEstreno: ['', Validators.required],
    estatus: ['', Validators.required],
    detalle: new FormGroup({
      id: new FormControl(),
      director: new FormControl(),
      actores: new FormControl(),
      sinopsis: new FormControl(),
      trailer: new FormControl(),
    }),
  });
  constructor(
    private peliculaService: PeliculaService,
    private detalleService: DetalleService,
    private route: Router,

    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.detalleService
      .getDetalles()
      .subscribe((resp) => (this.detalles = resp));

    if (!this.route.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.peliculaService.getPeliculaById(id)),
        tap((res) => {
          this.peliculaNew = res;
          this.peliculaForm.patchValue(this.peliculaNew);
        })
      )
      .subscribe();
    /* si se actualiza el detalle */
    this.peliculaForm
      .get('detalle')
      ?.valueChanges.pipe(
        switchMap((detalle) => this.detalleService.getDetalleById(detalle.id)),
        tap((res) => {
          this.detalleNew = res;
          this.peliculaForm.get('detalle')?.patchValue(this.detalleNew);
        })
      )
      .subscribe();
  }
  get titulo() {
    return this.peliculaForm.get('titulo');
  }
  get duracion() {
    return this.peliculaForm.get('duracion');
  }

  get clasificacion() {
    return this.peliculaForm.get('clasificacion');
  }

  get genero() {
    return this.peliculaForm.get('genero');
  }
  get imagen() {
    return this.peliculaForm.get('imagen');
  }
  get fechaEstreno() {
    return this.peliculaForm.get('fechaEstreno');
  }
  get detalle() {
    return this.peliculaForm.get('detalle');
  }
  guardar() {
    /* caso update Película */

    if (this.peliculaNew.id) {
      const updatePelicula = {
        ...this.peliculaNew,
        ...this.peliculaForm.value,
      };

      this.peliculaService.updatePeliculaById(updatePelicula).subscribe({
        next: (resp) => {
          this.peliculaForm.patchValue(resp);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Película actualizada correctamente !',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigateByUrl('peliculas/list');
        },
        error(err) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error,consulte a un administrador!',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(err);
        },
      });
    } else {
      /* caso add Película */
      const body = this.peliculaForm.value;
      this.peliculaService.addPelicula(body).subscribe({
        next: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Película insertada correctamente !',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigateByUrl('/peliculas/list');
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error,consulte a un administrador!',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('error', err);
        },
      });
    }
  }
  regresar() {
    this.route.navigateByUrl('peliculas/list');
  }
}
