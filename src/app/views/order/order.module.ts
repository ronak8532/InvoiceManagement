import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { AmountInWordsPipe } from '../../pipe/number-to-words.pipe';

@NgModule({
  declarations: [
    OrderComponent,
    AddOrderComponent,
    AmountInWordsPipe
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    FormsModule
  ]
})
export class OrderModule { }
