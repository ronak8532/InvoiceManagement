import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import {  AddOrderComponent } from './add-order/add-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    data: {
      title: 'Order'
    }
  },
  {
    path: 'create',
    component: AddOrderComponent,
    data: {
      title: 'Order'
    }
  },
  {
    path: 'update/:id',
    component: AddOrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
