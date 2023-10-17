import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Horario } from '../interfaces/horario.interface';
@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  constructor(private http: HttpClient) {}
  _baseUrl = environment.apiUrl;

  getHorarios(): Observable<Horario[]> {
    const url = `${this._baseUrl}/horarios`;
    return this.http.get<Horario[]>(url);
  }
  getHorarioById(id: number): Observable<Horario> {
    const url = `${this._baseUrl}/horarios/${id}`;
    return this.http.get<Horario>(url);
  }
  addHorario(horario: Horario): Observable<Horario> {
    const url = `${this._baseUrl}/horarios`;
    return this.http.post<Horario>(url, horario);
  }
  updateHorarioById(horario: Horario): Observable<Horario> {
    const url = `${this._baseUrl}/horarios/${horario.id}`;
    return this.http.put<Horario>(url, horario);
  }
}
