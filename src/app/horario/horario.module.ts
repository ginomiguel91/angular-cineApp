import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorarioRoutingModule } from './horario-routing.module';
import { AddHorarioComponent } from './pages/add-horario/add-horario.component';
import { ListHorarioComponent } from './pages/list-horario/list-horario.component';
import { ShowHorarioComponent } from './pages/show-horario/show-horario.component';
import { SharedModule } from '../shared/shared.module';
import { PeliculaModule } from '../pelicula/pelicula.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddHorarioComponent,
    ListHorarioComponent,
    ShowHorarioComponent,
  ],
  imports: [
    CommonModule,
    HorarioRoutingModule,
    SharedModule,
    PeliculaModule,
    ReactiveFormsModule,
  ],
})
export class HorarioModule {}
