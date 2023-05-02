import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Cierre, createCierre, session, date } from 'src/app/models/cierre.model';

@Injectable({
  providedIn: 'root'
})
export class CierreService {

  constructor(
    private http: HttpClient
  ) { }

  private api = 'http://173.2.9.143:3020/Api';

  list(){
    return this.http.get<Cierre[]>(`${this.api}/list/`)
  }

  getSession(){
    return this.http.get<session[]>(`${this.api}/getSession/`)
  }

  getDate(){
    return this.http.get<date[]>(`${this.api}/getDate/`)
  }

  get(id: string){
    return this.http.get<Cierre>(`${this.api}/BuscarRegistro/${id}`)
  }

  create(cierre: createCierre){
    return this.http.post<Cierre>(`${this.api}/AgregarNuevoRegistro/`, cierre);
  }

  update(cierre: Cierre){
    return this.http.put<Cierre>(`${this.api}/ActualizarRegistro/`, cierre);
  }

  delete(id: string){
    return this.http.delete<Cierre>(`${this.api}/BorrarRegistro/${id}`);
  }

  uploadfile(file: Blob){
    console.log('file: ', file);

    const dto = new FormData();
    dto.append('file', file);
    dto.append('archivo', file);
    console.log('dto: ', dto);

    return this.http.post(`${this.api}/CargarArchivo/`, dto, {
      headers: { 'Content-Type': 'multipart/form-data'}
    });
  }
}
