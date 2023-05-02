import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Core, createCore } from 'src/app/models/core.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private http: HttpClient
  ) { }

  private api = 'http://173.2.9.143:3022/Api';

  list(){
    return this.http.get<Core[]>(`${this.api}/list/`)
  }

  get(id: string){
    return this.http.get<Core>(`${this.api}/BuscarRegistro/${id}`)
  }

  create(Core: createCore){
    return this.http.post<Core>(`${this.api}/AgregarNuevoRegistro/`, Core);
  }

  update(Core: Core){
    return this.http.put<Core>(`${this.api}/ActualizarRegistro/`, Core);
  }

  delete(id: string){
    return this.http.delete<Core>(`${this.api}/BorrarRegistro/${id}`);
  }
}
