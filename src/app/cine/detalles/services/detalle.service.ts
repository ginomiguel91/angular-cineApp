import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Detalle } from '../interfaces/detalle.interface';

@Injectable({
  providedIn: 'root',
})
export class DetalleService {
  _baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getDetalles(): Observable<Detalle[]> {
    const url = `${this._baseUrl}/detalles`;

    return this.http.get<Detalle[]>(url);
  }

  addDetalle(detalle: Detalle): Observable<Detalle> {
    const url = `${this._baseUrl}/detalles`;

    return this.http.post<Detalle>(url, detalle);
  }

  removeDetalleById(id: number): any {
    const url = `${this._baseUrl}/detalles/${id}`;
    return this.http.delete<any>(url);
  }

  getDetalleById(id: number): Observable<Detalle> {
    const url = `${this._baseUrl}/detalles/${id}`;
    return this.http.get<Detalle>(url);
  }

  updateDetalleById(detalle: Detalle): Observable<Detalle> {
    const url = `${this._baseUrl}/detalles/${detalle.id}`;
    return this.http.put<Detalle>(url, detalle);
  }
}
