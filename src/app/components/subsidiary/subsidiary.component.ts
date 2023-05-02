import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Subsidiary, createSubsidiary } from 'src/app/models/subsidiary.model';
import {formatDate} from '@angular/common';
import { SubsidiaryService } from '../../services/subsidiary.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-subsidiary',
  templateUrl: './subsidiary.component.html',
  styleUrls: ['./subsidiary.component.scss']
})
export class SubsidiaryComponent {

  faPlus = faPlus;
  faUpload = faUpload;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;

  fileName= 'Subsidiary.xlsx';

  hoy = new Date();

  subsidiary: Subsidiary[] = [];
  newSubsidiary: createSubsidiary = {
    codsubsidiary: '',
    nombre: '',
    //pkidregister: '',
    vigenciadesde: '',
    vigenciahasta: ''

  }

  deleteSubsidiary = "0";

  editSubsidiary: Subsidiary = {
    codsubsidiary: '',
    nombre: '',
    pkidregister: '',
    vigenciadesde: '',
    vigenciahasta: ''
  };
  constructor(
    private subsidiaryService: SubsidiaryService
  ){  }

  ngOnInit(){
    console.log('onInit');
    this.subsidiaryService.list().subscribe(data => {
      console.log(data);
      this.subsidiary = data;
    });
  }

  create(){
    //this.newSubsidiary.fecha = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.subsidiaryService.create(this.newSubsidiary).subscribe(data => {
      console.log(data);
      this.subsidiary.unshift(data);
    });
  }

  get(id: string){
    this.subsidiaryService.get(id).subscribe(data => {
      console.log(data);
      this.editSubsidiary = data;
    });
  }

  update(){
    this.subsidiaryService.update(this.editSubsidiary).subscribe(data => {
      console.log(data);
      const SubsidiaryIndex = this.subsidiary.findIndex(item => item.pkidregister === this.editSubsidiary.pkidregister);
      this.subsidiary[SubsidiaryIndex] = data;
      //this.Subsidiary.unshift(data);
    });
  }

  btnDelete(id: string){
    this.deleteSubsidiary = id;
  }

  delete(){
    this.subsidiaryService.delete(this.deleteSubsidiary).subscribe(data => {
      console.log(data);
      const subsidiaryIndex = this.subsidiary.findIndex(item => item.pkidregister === this.deleteSubsidiary);
      this.subsidiary.splice(subsidiaryIndex, 1);
      //this.products = data;
    });

  }

  exportexcel(){
    /* pass here the table id */
    const element = document.getElementById('tableSubsidiary');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
