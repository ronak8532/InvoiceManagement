import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  getAllExpense() {
   return this.http.get(`${environment.baseUrl}/admin/expense/list`);
  }

  getExpenseById(id: any) {
    return this.http.get(`${environment.baseUrl}/admin/expense/findById/${id}`);
  }

  saveExpense(data: any) {
    return this.http.post(`${environment.baseUrl}/admin/expense/addExpense`, data);
  }

  updateExpense(id:any, data: any) {
    return this.http.post(`${environment.baseUrl}/admin/expense/updateExpense/${id}`, data);
  }

  deleteExpense(id: any) {
    return this.http.delete(`${environment.baseUrl}/admin/expense/deleteExpense/${id}`);
  }

}
