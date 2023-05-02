import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CierreComponent } from './components/cierre/cierre.component';
import { NavComponent } from './components/nav/nav.component';
import { SubsidiaryComponent } from './components/subsidiary/subsidiary.component';
import { CoreComponent } from './components/core/core.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { AccountingComponent } from './components/accounting/accounting.component';
import { NetsuiteComponent } from './components/netsuite/netsuite.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';



@NgModule({
  declarations: [
    AppComponent,
    CierreComponent,
    NavComponent,
    SubsidiaryComponent,
    CoreComponent,
    DynamicComponent,
    AccountingComponent,
    NetsuiteComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
