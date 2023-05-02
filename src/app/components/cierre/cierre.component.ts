import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Cierre, createCierre } from 'src/app/models/cierre.model';
import {formatDate} from '@angular/common';
import { CierreService } from '../../services/cierre.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.scss']
})
export class CierreComponent implements OnInit {

  faPlus = faPlus;
  faUpload = faUpload;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;

  fileName= 'Cierre.xlsx';

  hoy = new Date();

  cierre: Cierre[] = [];
  newCierre: createCierre = {
    nro: '',
    codcore: '',
    transactionh: '',
    fecha: '',
    nombrearchivo: '',
    psession: '',
    amount: '',
    totalamount: ''
    //pkidregister: ''
  }

  deleteCierre = "0";

  editCierre: Cierre = {
    nro: '',
    codcore: '',
    transactionh: '',
    fecha: '',
    nombrearchivo: '',
    psession: '',
    amount: '',
    totalamount: '',
    pkidregister: ''
  };
  constructor(
    private cierreService: CierreService
  ){  }

  ngOnInit(){
    console.log('onInit');
    this.cierreService.list().subscribe(data => {
      console.log(data);
      this.cierre = data;
    });
  }

  getSession(){
    console.log('onInit');
    this.cierreService.getSession().subscribe(data => {
      console.log(data);
      //this.cierre = data;
    });
  }

  create(){
    this.newCierre.fecha = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.cierreService.create(this.newCierre).subscribe(data => {
      console.log(data);
      this.cierre.unshift(data);
    });
  }

  get(id: string){
    this.cierreService.get(id).subscribe(data => {
      console.log(data);
      this.editCierre = data;
    });
  }

  update(){
    this.cierreService.update(this.editCierre).subscribe(data => {
      console.log(data);
      const cierreIndex = this.cierre.findIndex(item => item.pkidregister === this.editCierre.pkidregister);
      this.cierre[cierreIndex] = data;
      //this.cierre.unshift(data);
    });
  }

  btnDelete(id: string){
    this.deleteCierre = id;
  }

  delete(){
    this.cierreService.delete(this.deleteCierre).subscribe(data => {
      console.log(data);
      const cierreIndex = this.cierre.findIndex(item => item.pkidregister === this.deleteCierre);
      this.cierre.splice(cierreIndex, 1);
      //this.products = data;
    });

  }

  uploadFile(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0) as Blob

    console.log('file uploadFile', file);
    if(file){
      this.cierreService.uploadfile(file).subscribe(data => {
        console.log(data);
      })
    }

  }

  exportexcel(){
    /* pass here the table id */
    const element = document.getElementById('tableCierre');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
