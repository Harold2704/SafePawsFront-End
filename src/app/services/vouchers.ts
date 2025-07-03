import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { vouchers } from '../models/vouchers';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Vouchers {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<vouchers[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<vouchers[]>(`${this.url}/voucher/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/voucher/delete/${id}`);
  }

  insert(so: vouchers) {
    return this.http.post(`${this.url}/voucher/register`, so);
  }

  setList(listaNueva: vouchers[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
