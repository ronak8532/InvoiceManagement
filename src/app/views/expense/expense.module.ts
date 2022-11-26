import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AddExpenseComponent } from './add-expense/add-expense.component';


@NgModule({
  declarations: [
    ExpenseComponent,
    AddExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class ExpenseModule { }
