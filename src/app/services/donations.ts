import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { donations } from '../models/donations';
import { HttpClient } from '@angular/common/http';
import { shelters } from '../models/shelters';
import { clients } from '../models/clients';
import { vouchers } from '../models/vouchers';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Donations {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<donations[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<donations[]>(`${this.url}/donations/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/donations/delete/${id}`);
  }

  insert(so: donations) {
    return this.http.post(`${this.url}/donations/register`, so);
  }

  setList(listaNueva: donations[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  getShelters() {
    return this.http.get<shelters[]>(`${this.url}/shelter/list`);
  }

  getClients() {
    return this.http.get<clients[]>(`${this.url}/client/list`);
  }

  getVouchers() {
    return this.http.get<vouchers[]>(`${this.url}/voucher/list`);
  }
}
