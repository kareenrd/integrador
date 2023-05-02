import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Dynamic, createDynamic } from 'src/app/models/dynamic.model';
import {formatDate} from '@angular/common';
import { DynamicService } from '../../services/dynamic.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent {

  faPlus = faPlus;
  faUpload = faUpload;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;

  fileName= 'Dynamic.xlsx';

  hoy = new Date();

  dynamic: Dynamic[] = [];
  newDynamic: createDynamic = {
    class: '',
    codcore: '',
    codtransaccion: '',
    cuentapuc: '',
    departament: '',
    entity: '',
    idaccount: '',
    location: '',
    memo: '',
    naturaleza: '',
    orden: '',
    //pkidregister: '',
    subsidiary: '',
    vigenciadesde: '',
    vigenciahasta: '',


  }

  deleteDynamic = "0";

  editDynamic: Dynamic = {
    class: '',
    codcore: '',
    codtransaccion: '',
    cuentapuc: '',
    departament: '',
    entity: '',
    idaccount: '',
    location: '',
    memo: '',
    naturaleza: '',
    orden: '',
    pkidregister: '',
    subsidiary: '',
    vigenciadesde: '',
    vigenciahasta: '',
  };
  constructor(
    private dynamicService: DynamicService
  ){  }

  ngOnInit(){
    console.log('onInit Dynamic');
    this.dynamicService.list().subscribe(data => {
      console.log(data);
      this.dynamic = data;
    }, error => {
      //document.getElementById('errorDynamic').innerHTML = 'display:block;';
      //$('errorCode');
      //this.toastr.error('Operación exitosa', '¡Genial!');
      console.log("error: ",error);
    });
  }

  create(){
    //this.newDynamic.fecha = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.dynamicService.create(this.newDynamic).subscribe(data => {
      console.log(data);
      this.dynamic.unshift(data);
    });
  }

  get(id: string){
    this.dynamicService.get(id).subscribe(data => {
      console.log(data);
      this.editDynamic = data;
    });
  }

  update(){
    this.dynamicService.update(this.editDynamic).subscribe(data => {
      console.log(data);
      const DynamicIndex = this.dynamic.findIndex(item => item.pkidregister === this.editDynamic.pkidregister);
      this.dynamic[DynamicIndex] = data;
      //this.Dynamic.unshift(data);
    });
  }

  btnDelete(id: string){
    this.deleteDynamic = id;
  }

  delete(){
    this.dynamicService.delete(this.deleteDynamic).subscribe(data => {
      console.log(data);
      const DynamicIndex = this.dynamic.findIndex(item => item.pkidregister === this.deleteDynamic);
      this.dynamic.splice(DynamicIndex, 1);
      //this.products = data;
    });

  }

  uploadfile(file: Blob){
    const dto = new FormData();
    dto.append('file', file);
  }

  exportexcel(){
    /* pass here the table id */
    const element = document.getElementById('tableDynamic');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
