import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { comments } from '../models/comments';
import { HttpClient } from '@angular/common/http';
import { shelters } from '../models/shelters';
import { clients } from '../models/clients';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Comments {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<comments[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<comments[]>(`${this.url}/comments/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/comments/delete/${id}`);
  }

  insert(so: comments) {
    return this.http.post(`${this.url}/comments/register`, so);
  }

  setList(listaNueva: comments[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<comments>(`${this.url}/comments/list/${id}`);
  }

  update(id: number, so: comments) {
    return this.http.put(`${this.url}/comments/modification/${id}`, so);
  }

  getShelters() {
    return this.http.get<shelters[]>(`${this.url}/shelter/list`);
  }

  getClients() {
    return this.http.get<clients[]>(`${this.url}/client/list`);
  }
}
