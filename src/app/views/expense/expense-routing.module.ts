import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
const routes: Routes = [
  {
    path: '',
    component: ExpenseComponent,
    data: {
      title: 'Expense'
    }
  },
  {
    path: 'create',
    component: AddExpenseComponent,
    data: {
      title: 'Order'
    }
  },
  {
    path: 'update/:id',
    component: AddExpenseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
