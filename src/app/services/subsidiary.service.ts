import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subsidiary, createSubsidiary } from 'src/app/models/subsidiary.model';

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryService {

  constructor(
    private http: HttpClient
  ) { }

  private api = 'http://173.2.9.143:3021/Api';

  list(){
    return this.http.get<Subsidiary[]>(`${this.api}/list/`)
  }

  get(id: string){
    return this.http.get<Subsidiary>(`${this.api}/BuscarRegistro/${id}`)
  }

  create(Subsidiary: createSubsidiary){
    return this.http.post<Subsidiary>(`${this.api}/AgregarNuevoRegistro/`, Subsidiary);
  }

  update(Subsidiary: Subsidiary){
    return this.http.put<Subsidiary>(`${this.api}/ActualizarRegistro/`, Subsidiary);
  }

  delete(id: string){
    return this.http.delete<Subsidiary>(`${this.api}/BorrarRegistro/${id}`);
  }
}
