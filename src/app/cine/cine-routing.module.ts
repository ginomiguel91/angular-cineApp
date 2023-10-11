import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetallesComponent } from './detalles/pages/list-detalles/list-detalles.component';
import { AddDetalleComponent } from './detalles/pages/add-detalle/add-detalle.component';
import { ShowDetalleComponent } from './detalles/pages/show-detalle/show-detalle.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListDetallesComponent,
      },
      {
        path: 'add',
        component: AddDetalleComponent,
      },
      {
        path: 'edit/:id',
        component: AddDetalleComponent,
      },
      {
        path: ':id',
        component: ShowDetalleComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CineRoutingModule {}
