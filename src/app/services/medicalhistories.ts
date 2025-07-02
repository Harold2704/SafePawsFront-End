import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { medicalhistories } from '../models/medicalhistories';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class Medicalhistories {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<medicalhistories[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<medicalhistories[]>(`${this.url}/medicalhistory/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/medicalhistory/delete/${id}`);
  }
}
