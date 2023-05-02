import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Core, createCore } from 'src/app/models/core.model';
import {formatDate} from '@angular/common';
import { CoreService } from '../../services/core.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  faPlus = faPlus;
  faUpload = faUpload;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;

  fileName= 'Core.xlsx';

  hoy = new Date();

  core: Core[] = [];
  newCore: createCore = {
    codcore: '',
    nombre: '',
    //pkidregister: '',
    vigenciadesde: '',
    vigenciahasta: ''

  }

  deleteCore = "0";

  editCore: Core = {
    codcore: '',
    nombre: '',
    pkidregister: '',
    vigenciadesde: '',
    vigenciahasta: ''
  };
  constructor(
    private coreService: CoreService
  ){  }

  ngOnInit(){
    console.log('onInit core');
    this.coreService.list().subscribe(data => {
      console.log(data);
      this.core = data;
    }, error => {
      //document.getElementById('errorCore').innerHTML = 'display:block;';
      //$('errorCode');
      //this.toastr.error('Operación exitosa', '¡Genial!');
      console.log("error: ",error);
    });
  }

  create(){
    //this.newCore.fecha = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.coreService.create(this.newCore).subscribe(data => {
      console.log(data);
      this.core.unshift(data);
    });
  }

  get(id: string){
    this.coreService.get(id).subscribe(data => {
      console.log(data);
      this.editCore = data;
    });
  }

  update(){
    this.coreService.update(this.editCore).subscribe(data => {
      console.log(data);
      const CoreIndex = this.core.findIndex(item => item.pkidregister === this.editCore.pkidregister);
      this.core[CoreIndex] = data;
      //this.Core.unshift(data);
    });
  }

  btnDelete(id: string){
    this.deleteCore = id;
  }

  delete(){
    this.coreService.delete(this.deleteCore).subscribe(data => {
      console.log(data);
      const CoreIndex = this.core.findIndex(item => item.pkidregister === this.deleteCore);
      this.core.splice(CoreIndex, 1);
      //this.products = data;
    });

  }

  uploadfile(file: Blob){
    const dto = new FormData();
    dto.append('file', file);
  }

  exportexcel(){
    /* pass here the table id */
    const element = document.getElementById('tableCore');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
