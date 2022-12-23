import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  getBank() {
   return this.http.get(`${environment.baseUrl}/admin/bank/list`);
  }

  saveBank(data: any) {
    return this.http.post(`${environment.baseUrl}/admin/bank/addBank`, data);
  }

  updateBank(id:any, data: any) {
    return this.http.post(`${environment.baseUrl}/admin/bank/updateBank/${id}`, data);
  }

  deleteBank(id: any) {
    return this.http.delete(`${environment.baseUrl}/admin/bank/deleteBank/${id}`);
  }

}
