import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { pets } from '../models/pets';
import { HttpClient } from '@angular/common/http';
import { shelters } from '../models/shelters';
import { races } from '../models/races';
import { DTOMascotasPorAlbergue } from '../models/DTOMascotasPorAlbergue';
import { DTOAlbergueNoLlenos } from '../models/DTOAlberguesNoLlenos';
import { DTOTop5RazasMasAdoptadas } from '../models/DTOTop5RazasMasAdoptadas';
import { DTOMascotasPorEdadSinAdopcion } from '../models/DTOMascotasPorEdadSinAdopcion';
import { DTOEspecieConRazas } from '../models/DTOEspecieConRazas';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Pets {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<pets[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<pets[]>(`${this.url}/pet/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/pet/delete/${id}`);
  }

  insert(so: pets) {
    return this.http.post(`${this.url}/pet/register`, so);
  }

  setList(listaNueva: pets[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<pets>(`${this.url}/pet/list/${id}`);
  }

  update(id: number, so: pets) {
    return this.http.put(`${this.url}/pet/modification/${id}`, so);
  }

  getShelters() {
    return this.http.get<shelters[]>(`${this.url}/shelter/list`);
  }

  getRaces() {
    return this.http.get<races[]>(`${this.url}/race/list`);
  }

  getPetAdoptedBySpeciesAndBreed(): Observable<DTOEspecieConRazas[]> {
    return this.http.get<DTOEspecieConRazas[]>(`${this.url}/pet/adoptedForSpeciesAndRaceGrouped`);
  }

  getPetAdoptedByShelter(): Observable<DTOMascotasPorAlbergue[]> {
    return this.http.get<DTOMascotasPorAlbergue[]>(`${this.url}/pet/adoptedForShelter`);
  }

  getShelterNotFull(): Observable<DTOAlbergueNoLlenos[]> {
    return this.http.get<DTOAlbergueNoLlenos[]>(`${this.url}/pet/sheltersNotFull`);
  }

  getTop5MostAdoptedBreeds(): Observable<DTOTop5RazasMasAdoptadas[]> {
    return this.http.get<DTOTop5RazasMasAdoptadas[]>(`${this.url}/pet/top5RacesMoreAdoptions`);
  }

  getPetsNotAdoptedByAge(): Observable<DTOMascotasPorEdadSinAdopcion[]> {
    return this.http.get<DTOMascotasPorEdadSinAdopcion[]>(`${this.url}/pet/notAdoptedByAgeGroup`);
  }
}
