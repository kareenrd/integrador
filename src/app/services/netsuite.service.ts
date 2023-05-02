import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Accounting, createAccounting, searchAccounting, generateAccounting } from 'src/app/models/accounting.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(
    private http: HttpClient
  ) { }

  private api = 'http://localhost:8083/Api';
  private api_netsuite = 'http://localhost:8087/Api/'

  generate(data: generateAccounting){
    return this.http.post<generateAccounting>(`${this.api}/GenerarAsiento/`, data);
  }

  get(id: string){
    return this.http.post<Accounting[]>(`${this.api}/getAccounting/`, id);
  }

  sendNetsuite(id: string){
    return this.http.post<generateAccounting>(`${this.api}/generateNetSuite/`, id);
  }
}
