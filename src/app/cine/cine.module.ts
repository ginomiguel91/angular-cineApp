import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CineRoutingModule } from './cine-routing.module';
import { AddDetalleComponent } from './detalles/pages/add-detalle/add-detalle.component';
import { ListDetallesComponent } from './detalles/pages/list-detalles/list-detalles.component';
import { ShowDetalleComponent } from './detalles/pages/show-detalle/show-detalle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewDetalleComponent } from './detalles/components/view-detalle/view-detalle.component';

@NgModule({
  declarations: [
    AddDetalleComponent,
    ListDetallesComponent,
    ShowDetalleComponent,
    ViewDetalleComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CineRoutingModule,
    ReactiveFormsModule,
  ],
})
export class CineModule {}
