import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../interfaces/horario.interface';

@Component({
  selector: 'app-list-horario',
  templateUrl: './list-horario.component.html',
  styleUrls: ['./list-horario.component.css'],
})
export class ListHorarioComponent implements OnInit {
  panelOpenState = false;
  horarios: Horario[] = [];
  constructor(private horarioService: HorarioService) {}
  ngOnInit(): void {
    this.horarioService
      .getHorarios()
      .subscribe((resp) => (this.horarios = resp));
  }
}
