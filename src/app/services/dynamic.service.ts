import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Dynamic, createDynamic } from 'src/app/models/dynamic.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicService {

  constructor(
    private http: HttpClient
  ) { }

  private api = 'http://173.2.9.143:3023/Api';

  list(){
    return this.http.get<Dynamic[]>(`${this.api}/list/`)
  }

  get(id: string){
    return this.http.get<Dynamic>(`${this.api}/BuscarRegistro/${id}`)
  }

  create(Dynamic: createDynamic){
    return this.http.post<Dynamic>(`${this.api}/AgregarNuevoRegistro/`, Dynamic);
  }

  update(Dynamic: Dynamic){
    return this.http.put<Dynamic>(`${this.api}/ActualizarRegistro/`, Dynamic);
  }

  delete(id: string){
    return this.http.delete<Dynamic>(`${this.api}/BorrarRegistro/${id}`);
  }
}
