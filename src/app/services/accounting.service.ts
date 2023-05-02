import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Accounting, createAccounting, searchAccounting, generateAccounting } from 'src/app/models/accounting.model';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(
    private http: HttpClient
  ) { }

  private api = environment.ACCOUNTING_API;
  private api_netsuite = environment.NETSUITE_API

  generate(data: generateAccounting){
    return this.http.post<Accounting[]>(`${this.api}/GenerarAsiento/`, data);
  }

  get(id: string){
    return this.http.post<Accounting[]>(`${this.api}/getAccounting/`, id);
  }

  sendNetsuite(id: string){
    return this.http.post(`${this.api_netsuite}/generateNetSuite/`, id);
  }
}
