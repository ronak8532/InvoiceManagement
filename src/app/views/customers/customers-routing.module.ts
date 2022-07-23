import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component'
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    data: {
      title: 'Customer'
    }
  },
  {
    path: 'create',
    component: AddCustomerComponent,
  },
  {
    path: 'update/:id',
    component: AddCustomerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
