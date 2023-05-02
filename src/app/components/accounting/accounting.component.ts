import { Component, Input, Output, EventEmitter, OnChanges, OnInit, Injectable, PipeTransform } from '@angular/core';
import { Accounting, createAccounting, searchAccounting, generateAccounting, searchFullAccounting } from 'src/app/models/accounting.model';
import {formatDate} from '@angular/common';
import { AccountingService } from '../../services/accounting.service';
import { SubsidiaryService } from '../../services/subsidiary.service';
import { Subsidiary, createSubsidiary } from 'src/app/models/subsidiary.model';
import { CoreService } from '../../services/core.service'
import { Core, createCore } from 'src/app/models/core.model';
import { CierreService } from '../../services/cierre.service';
import { Cierre, createCierre, session, date } from 'src/app/models/cierre.model';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
// import { SortColumn, SortDirection } from './sortable.directive';

import * as XLSX from 'xlsx';
import { LiveAnnouncer } from '@angular/cdk/a11y';




@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent{



  faPlus = faPlus;
  faUpload = faUpload;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;
  faSearch = faSearch;
  faShare = faShare;

  fileName= 'Accounting.xlsx';

  hoy = new Date();

  accounting: Accounting[] = [];
  newAccounting: createAccounting = {
    accountid: '',
    classid: '',
    codcore: '',
    codtransaccion: '',
    cuentapuc: '',
    departamentid: '',
    fechaasiento: '',
    fechageneracion: '',
    idaccounting: '',
    identityid: '',
    locationid: '',
    memo: '',
    monto: '',
    naturaleza: '',
    nota: '',
    //pkidregister: '',
    psession: '',
    subsidiary: '',
  }

  deleteAccounting = "0";
  searchAccounting: searchFullAccounting = {
    subsidiary: '',
    fechaasiento: '',
    session: '',
    corecode: ''
    //nota: ''
  };

  generatehAccounting: generateAccounting = {
    subsidiary: '',
    fechaasiento: '',
    session: '',
    corecode: '',
    nota: ''
  };

  editAccounting: Accounting = {
    accountid: '',
    classid: '',
    codcore: '',
    codtransaccion: '',
    cuentapuc: '',
    departamentid: '',
    fechaasiento: '',
    fechageneracion: '',
    idaccounting: '',
    identityid: '',
    locationid: '',
    memo: '',
    monto: '',
    naturaleza: '',
    nota: '',
    pkidregister: '',
    psession: '',
    subsidiary: '',

  };

  subsidiary: Subsidiary[] = [];
  core: Core[] = [];
  session: session[] = [];
  date: date[] = [];

  search = "null";
  estado = 'none';


  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['accountid',
  'codtransaccion',
  'cuentapuc',
  'idaccounting',
  'memo',
  'monto',
  'naturaleza',
  'nota']
  ;
  dataSource:any;


  constructor(
    private accountingService: AccountingService,
    private subsidiaryService: SubsidiaryService,
    private coreService: CoreService,
    private cierreService: CierreService,

    private _liveAnnouncer: LiveAnnouncer



  ){
    console.log('displayedColumns ',this.displayedColumns);
   }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(){
    console.log('onInit Accounting');
    /*this.accountingService.generate().subscribe(data => {
      console.log(data);
      this.accounting = data;
    }, error => {
      //document.getElementById('errorAccounting').innerHTML = 'display:block;';
      //$('errorCode');
      //this.toastr.error('Operación exitosa', '¡Genial!');
      console.log("error: ",error);
    });*/

    this.subsidiaryService.list().subscribe(data => {
      console.log('subsidiaryService ',data);
      this.subsidiary = data;
    });

    this.coreService.list().subscribe(data => {
      console.log('coreService ',data);
      this.core = data;
    });

    this.cierreService.getSession().subscribe(data => {
      console.log('getSession ',data);
      this.session = data;
      console.log('getSession ',this.session);

    });

    this.cierreService.getDate().subscribe(data => {
      console.log('getDate ',data);
      this.date = data;
      console.log('getDate ',this.date);

    });
  }

  searchAcc(){
    console.log('searchAccounting ',this.searchAccounting);
    this.search = 'Asiento|'+this.searchAccounting.subsidiary+"|"+this.searchAccounting.session+"|"+this.searchAccounting.corecode+"|"+this.searchAccounting.fechaasiento;
    //console.log('dataSearch ',dataSearch);
    console.log('search  ',this.search);
    this.accountingService.get(this.search).subscribe(data => {
      console.log(data);
      this.accounting = data;
      this.dataSource = new MatTableDataSource(this.accounting);
      //this.dataSource = new MatTableDataSource(this.accounting);
      //this.dataSource = (this.accounting);
      this.dataSource.sort = this.sort;
    });
  }

  generate(){
    console.log('generate ', this.generatehAccounting);
    this.accountingService.generate(this.generatehAccounting).subscribe(data => {
      this.accounting = data;
    });
  }

  sendNetsuite(){
    this.accountingService.sendNetsuite(this.search).subscribe(data => {
      console.log('respuesta netSuite: '+ data);
    });
  }



  exportexcel(){
    /* pass here the table id */
    const element = document.getElementById('tableAccounting');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
