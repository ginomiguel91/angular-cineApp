import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../interfaces/horario.interface';
import {
  faCheckDouble,
  faCancel,
  faAsterisk,
} from '@fortawesome/free-solid-svg-icons';
import { Pelicula } from 'src/app/pelicula/interfaces/pelicula.interface';
import { PeliculaService } from 'src/app/pelicula/services/pelicula.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-horario',
  templateUrl: './add-horario.component.html',
  styleUrls: ['./add-horario.component.css'],
})
export class AddHorarioComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private peliculaService: PeliculaService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  peliculas: Pelicula[] = [];

  peliculaNew: Pelicula = {
    id: 0,
    titulo: '',
    duracion: 0,
    clasificacion: '',
    genero: '',
    imagen: '',
    fechaEstreno: new Date(),
    estatus: '',
    detalle: {
      id: 0,
      director: '',
      actores: '',
      sinopsis: '',
      trailer: '',
    },
  };
  ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (res) => {
        this.peliculas = res;
      },
      error: (err) => {
        console.log('error', err);
      },
    });

    if (!this.route.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.horarioService.getHorarioById(id)),
        tap((res) => {
          this.horarioNew = res;
          this.horarioForm.patchValue(this.horarioNew);
        })
      )
      .subscribe();

    /* si se actualiza la película */
    this.horarioForm
      .get('pelicula')
      ?.valueChanges.pipe(
        switchMap((pelicula) =>
          this.peliculaService.getPeliculaById(pelicula.id)
        ),
        tap((resp) => {
          this.peliculaNew = resp;
          this.horarioForm.get('pelicula')?.patchValue(this.peliculaNew);
        })
      )
      .subscribe();
  }
  faCheckDouble = faCheckDouble;
  faCancel = faCancel;
  faAsterisk = faAsterisk;
  horarioNew: Horario = {
    id: 0,
    fecha: new Date(),
    hora: '',
    sala: '',
    precio: 0,
    pelicula: {
      id: 0,
      titulo: '',
      duracion: 0,
      clasificacion: '',
      genero: '',
      imagen: '',
      fechaEstreno: new Date(),
      estatus: '',
      detalle: {
        id: 0,
        director: '',
        actores: '',
        sinopsis: '',
        trailer: '',
      },
    },
  };

  horarioForm: FormGroup = this.fb.group({
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    sala: ['', Validators.required],
    precio: ['', Validators.required],
    pelicula: this.fb.group({
      id: '',
      titulo: '',
      duracion: '',
      clasificacion: '',
      genero: '',
      imagen: '',
      fechaEstreno: '',
      estatus: '',
      detalle: this.fb.group({
        id: '',
        director: '',
        actores: '',
        sinopsis: '',
        trailer: '',
      }),
    }),
  });

  get fecha() {
    return this.horarioForm.get('fecha');
  }
  get hora() {
    return this.horarioForm.get('hora');
  }
  get sala() {
    return this.horarioForm.get('sala');
  }
  get precio() {
    return this.horarioForm.get('precio');
  }

  get pelicula() {
    return this.horarioForm.get('pelicula');
  }

  errorFieldRequired(campo: string): boolean {
    return (
      this.horarioForm.get(campo)?.invalid &&
      this.horarioForm.get(campo)?.errors?.['required']
    );
  }

  guardar() {
    /* update horario */
    if (this.horarioNew.id) {
      const updateHorario = { ...this.horarioNew, ...this.horarioForm.value };

      this.horarioService.updateHorarioById(updateHorario).subscribe({
        next: (resp) => {
          this.horarioForm.patchValue(resp);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cartelera actualizada correctamente !',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigateByUrl('horarios/list');
        },
        error(err) {
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
    } else {
      /* add horario */
      const body = this.horarioForm.value;
      this.horarioService.addHorario(body).subscribe({
        next: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cartelera guardada satisfactoriamente !',
            showConfirmButton: false,
            timer: 1500,
          });

          this.route.navigateByUrl('/horarios/list');
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
    this.route.navigateByUrl('/horarios/list');
  }
}
