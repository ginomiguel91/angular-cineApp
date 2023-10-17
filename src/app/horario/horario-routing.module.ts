import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHorarioComponent } from './pages/list-horario/list-horario.component';
import { AddHorarioComponent } from './pages/add-horario/add-horario.component';
import { ShowHorarioComponent } from './pages/show-horario/show-horario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListHorarioComponent,
      },
      {
        path: 'add',
        component: AddHorarioComponent,
      },
      {
        path: 'edit/:id',
        component: AddHorarioComponent,
      },
      {
        path: ':id',
        component: ShowHorarioComponent,
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
export class HorarioRoutingModule {}
