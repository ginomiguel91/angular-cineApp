import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './menu/menu.component';
import { CineRoutingModule } from '../cine/cine-routing.module';
import { PeliculaRoutingModule } from '../pelicula/pelicula-routing.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CineRoutingModule,
    PeliculaRoutingModule,
  ],
  exports: [MenuComponent],
})
export class SharedModule {}
