import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleService } from '../../services/detalle.service';
import { Detalle } from '../../interfaces/detalle.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show-detalle',
  templateUrl: './show-detalle.component.html',
})
export class ShowDetalleComponent implements OnInit {
  detalle!: Detalle;
  constructor(
    private activatedRoute: ActivatedRoute,
    private detalleService: DetalleService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.detalleService.getDetalleById(id);
        })
      )
      .subscribe({
        next: (resp) => {
          this.detalle = resp;
        },
        error: (err) => {
          console.log('Error', err);
        },
      });
  }
}
