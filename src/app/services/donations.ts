import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { donations } from '../models/donations';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class Donations {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<donations[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<donations[]>(`${this.url}/donations/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/donations/delete/${id}`);
  }
}
