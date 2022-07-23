import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  getAllCustomer() {
   return this.http.get(`${environment.baseUrl}/admin/user/list`);
  }

  getAllState() {
    return this.http.get('./assets/state/state.json');
  }

  saveCustomer(data: any) {
    return this.http.post(`${environment.baseUrl}/admin/user/register`, data);
  }

  getCustomerById(id: any) {
    return this.http.get(`${environment.baseUrl}/admin/user/findById/${id}`);
  }

  updateCustomer(data: any) {
    return this.http.post(`${environment.baseUrl}/admin/user/update/${data._id}`, data);
  }

  deleteCustomer(id: any) {
    return this.http.delete(`${environment.baseUrl}/admin/user/delete/${id}`);
  }

}
