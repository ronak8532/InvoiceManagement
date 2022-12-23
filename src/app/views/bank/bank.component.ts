import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';
import { OrderService } from 'src/app/services/order.service';
import { BankService } from '../../services/bank.service';
import { Bank } from './bank.model';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  bankForm:any = FormGroup;
  searchForm:any = FormGroup;
  bankInfo: any;
  orders: any;
  expenseList : any;
  passbookList : Bank[] = [];
  constructor(
    private bankService: BankService,
    private orderService: OrderService,
    private expenseService: ExpenseService,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getBankDetails();
    this.search();
  }

  initializeForm() {
    this.bankForm = new FormGroup({
      bankBalance: new FormControl("", Validators.required)
    })

    var date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let f = this.toJSONLocal(firstDay)
    let l = this.toJSONLocal(lastDay)
    this.searchForm = new FormGroup({
      fromDate: new FormControl(f),
      toDate: new FormControl(l)
    })
  }

  toJSONLocal(date: any) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  search() {
    if(this.searchForm.value) {
      this.passbookList = [];
      this.getAllExpense(this.searchForm.value.fromDate,this.searchForm.value.toDate);
      this.orderList(this.searchForm.value.fromDate,this.searchForm.value.toDate);
    }
  }

  getBankDetails() {
    this.bankService.getBank().subscribe((data : any) => {
      if(data) {
        this.bankInfo= data.bank[0];
      }
    })
  }

  getAllExpense(fromDate: any, toDate: any) {
    this.expenseService.getAllExpense(fromDate, toDate).subscribe((data: any) => {
      if(data && data.expense) {
        this.expenseList = data.expense;
        this.expenseList.forEach((e: any) => {
          let b = new Bank();
          b.Name = e.expenseDescription;
          b.Debit = e.amount;
          b.Credit = 0;
          b.Date = e.updated_at;
          this.passbookList.push(b);
        })
      }
    }, (err) => {
    })
  }

  orderList(fromDate: any,toDate: any) {
    this.orderService.getOrder(fromDate,toDate).subscribe((res:any) => {
      if(res) {
        this.orders = res.order;
        this.orders.forEach((o: any) => {
          let b = new Bank();
          b.Name = o.customerInfo.firstName + ' ' + o.customerInfo.lastName;
          b.Debit = 0;
          b.Credit = o.grandtotal;
          b.Date = o.updated_at;
          this.passbookList.push(b);
        })
      }
    },(err) => {
    })
  }

  get sortData() {
    return this.passbookList.sort((a, b) => {
      return <any>new Date(b.Date) - <any>new Date(a.Date);
    });
  }

}
