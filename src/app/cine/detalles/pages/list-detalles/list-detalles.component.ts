import { Component, OnInit } from '@angular/core';
import { DetalleService } from '../../services/detalle.service';
import { Detalle } from '../../interfaces/detalle.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-list-detalles',
  templateUrl: './list-detalles.component.html',
})
export class ListDetallesComponent implements OnInit {
  _detalles: Detalle[] = [];
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  constructor(private detalleService: DetalleService, private route: Router) {}
  ngOnInit(): void {
    this.detalleService.getDetalles().subscribe((resp) => {
      this._detalles = resp;
    });
  }
  removeDetalle(id: number) {
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
        this.detalleService
          .removeDetalleById(id)

          .subscribe({
            next: () => {
              Swal.fire(
                'Detalle eliminado!',
                'El detalle ha sido eliminado.',
                'success'
              );

              this._detalles = this._detalles.filter((item) => item.id !== id);
            },

            error: (err: any) => {
              console.log('Error', err);
              Swal.fire(
                'Detalle asociado a una película!!',
                'El detalle no  puede ser  eliminado.',
                'error'
              );
            },
          });
      }
    });
  }
}
