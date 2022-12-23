import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

import {ExpenseService} from '../../services/expense.service';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  expenseList: any;
  constructor(private expenseService: ExpenseService,
            private toastrService: ToastrService,
            private spinner: NgxSpinnerService,
            private router: Router,) {

   }

  ngOnInit(): void {
    this.getAllExpense();
  }

  getAllExpense() {
    this.spinner.show();
    this.expenseService.getAllExpense(null, null).subscribe((data: any) => {
      if(data && data.expense) {
        this.expenseList = data.expense;
        console.log(this.expenseList);
        this.spinner.hide();
      }
    }, (err) => {
      this.spinner.hide();
    })
  }

  createExpense() {
    this.router.navigate(['expense/create']);
  }

  updateExpense(expense: any) {
    this.router.navigate([`/expense/update/${expense._id}`]);
  }

  deleteConfirmation(expense: any) {

  }
}
