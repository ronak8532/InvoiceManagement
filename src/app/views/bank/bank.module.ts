import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    BankComponent,
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class BankModule { }
