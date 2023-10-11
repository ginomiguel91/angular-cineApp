import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pelicula } from '../interfaces/pelicula.interface';
import { DetalleService } from 'src/app/cine/detalles/services/detalle.service';
import { Detalle } from 'src/app/cine/detalles/interfaces/detalle.interface';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  _baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private detalleService: DetalleService
  ) {}

  getPeliculas(): Observable<Pelicula[]> {
    const url = `${this._baseUrl}/peliculas`;
    return this.http.get<Pelicula[]>(url);
  }

  removePelicula(id: number): Observable<any> {
    const url = `${this._baseUrl}/peliculas/${id}`;
    return this.http.delete<any>(url);
  }

  addPelicula(pelicula: Pelicula): Observable<Pelicula> {
    const url = `${this._baseUrl}/peliculas`;
    return this.http.post<Pelicula>(url, pelicula);
  }

  getPeliculaById(id: number): Observable<Pelicula> {
    const url = `${this._baseUrl}/peliculas/${id}`;
    return this.http.get<Pelicula>(url);
  }
  updatePeliculaById(pelicula: Pelicula): Observable<Pelicula> {
    const url = `${this._baseUrl}/peliculas/${pelicula.id}`;
    return this.http.put<Pelicula>(url, pelicula);
  }
}
