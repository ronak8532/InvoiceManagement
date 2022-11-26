import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  expenseForm:any = FormGroup;
  submitted: boolean = false;
  expenseId: any;
  statusList:any = ["Paid", "Not Paid"];
  constructor(private expenseService: ExpenseService,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe( paramMap => {
      this.expenseId = paramMap.get('id');
      if(this.expenseId) {
        this.getExpenseDetails(this.expenseId);
      }
    })
  }

  initForm(): void {
    this.expenseForm = new FormGroup({
      expenseDescription: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required),
      status: new FormControl(""),
    })
  }

  get f() {
    return this.expenseForm.controls;
  }

  getExpenseDetails(id: any) {
    this.spinner.show();
    this.expenseService.getExpenseById(id).subscribe((data: any) => {
      if(data && data.expense) {
        this.expenseId = data.expense._id;
        this.expenseForm = new FormGroup({
          _id: new FormControl(data.expense._id),
          expenseDescription: new FormControl(data.expense.expenseDescription),
          amount: new FormControl(data.expense.amount),
          status: new FormControl(data.expense.status)
        })
        this.spinner.hide();
      }
    },(err) =>{
      this.spinner.hide();
    })
  }

  saveExpense() {
    this.submitted = true;

    if(!this.expenseForm.valid) {
      return;
    }

    if(!this.expenseId) {
      this.expenseService.saveExpense(this.expenseForm.value).subscribe((data:any) => {
        if(data) {
          this.toastrService.success('Expense created successfully', 'Expense');
          this.router.navigate(['expense']);
        }
      });
    } else {
      this.expenseService.updateExpense(this.expenseId, this.expenseForm.value).subscribe((data:any) => {
        if(data) {
          this.toastrService.success('Expense updated successfully', 'Expense');
          this.router.navigate(['expense']);
        }
      });
    }
  }

  backExpense() {
    this.router.navigate(['expense']);
  }
}
