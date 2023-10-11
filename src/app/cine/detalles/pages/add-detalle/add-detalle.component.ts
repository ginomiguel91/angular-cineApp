import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalleService } from '../../services/detalle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import {
  faCheckDouble,
  faCancel,
  faAsterisk,
} from '@fortawesome/free-solid-svg-icons';

import { Detalle } from '../../interfaces/detalle.interface';
import { ValidatorService } from '../../services/validator.service';
@Component({
  selector: 'app-add-detalle',
  templateUrl: './add-detalle.component.html',
})
export class AddDetalleComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private detalleService: DetalleService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorService
  ) {}
  faCheckDouble = faCheckDouble;
  faCancel = faCancel;
  faAsterisk = faAsterisk;
  detalleNew: Detalle = {
    id: 0,
    director: '',
    actores: '',
    sinopsis: '',
    trailer: '',
  };
  detalleForm: FormGroup = this.fb.group({
    director: ['', Validators.required],
    actores: ['', Validators.required],
    sinopsis: ['', [Validators.required, Validators.minLength(20)]],
    trailer: [
      '',
      [
        Validators.required,
        Validators.minLength(15),
        Validators.pattern(this.validatorService.trailerPattern),
      ],
    ],
  });
  get director() {
    return this.detalleForm.get('director');
  }

  get actores() {
    return this.detalleForm.get('actores');
  }

  get sinopsis() {
    return this.detalleForm.get('sinopsis');
  }

  get trailer() {
    return this.detalleForm.get('trailer');
  }

  minLengthError(field: string): boolean {
    return this.detalleForm.get(field)?.errors?.['minlength'];
  }
  ngOnInit(): void {
    if (!this.route.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.detalleService.getDetalleById(id)),
        tap((resp) => {
          this.detalleNew = resp;
          this.detalleForm.patchValue(resp); //Establecer valor en el formulario
        })
      )
      .subscribe();
  }
  guardar() {
    /* caso update */
    if (this.detalleNew.id) {
      const updateDetalle = {
        ...this.detalleNew,
        ...this.detalleForm.value, // Usar los valores del formulario actualizados
      };
      this.detalleService.updateDetalleById(updateDetalle).subscribe({
        next: (resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Detalle de película actualizado correctamente !',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigateByUrl('/detalles/list');
          console.log(resp);
        },
        error: (err) => {
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
      /* caso add */
      const body = this.detalleForm.value;
      this.detalleService.addDetalle(body).subscribe({
        next: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Detalle de película insertado correctamente !',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigate(['/detalles/list']);
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
        complete: () => {
          console.log('completo');
        },
      });
    }
  }

  get errorMensajeCampoTrailer() {
    const errors = this.detalleForm.get('trailer')?.errors;
    if (errors?.['required']) {
      return 'El campo  trailer es requerido!';
    } else if (errors?.['pattern']) {
      return 'El valor ingresado de la url  no tiene el formato correcto !';
    } else if (errors?.['minlength']) {
      return 'El campo trailer no cumple con los requisitos de longitud mínima! ';
    } else {
      return '';
    }
  }
}
