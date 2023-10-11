import { Component, Input } from '@angular/core';
import { Detalle } from '../../interfaces/detalle.interface';
import {
  faEye,
  faArrowLeft,
  faCancel,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-view-detalle',
  templateUrl: './view-detalle.component.html',
})
export class ViewDetalleComponent {
  @Input() detalle!: Detalle;
  faEye = faEye;
  faArrowLeft = faArrowLeft;
  faCancel = faCancel;
}
