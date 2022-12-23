import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  placeOrder(data: any) {
    return this.http.post(`${environment.baseUrl}/admin/order/placeOrder`, data);
  }

  updateOrder(data: any, orderId: any) {
    return this.http.post(`${environment.baseUrl}/admin/order/updateOrder/${orderId}`, data);
  }

  getProductById(id: any) {
    return this.http.get(`${environment.baseUrl}/admin/product/findById/${id}`);
  }

  getLastOrder() {
    return this.http.get(`${environment.baseUrl}/admin/order/getLastOrder`);
  }

  updateProduct(id:any, data: any) {
    return this.http.post(`${environment.baseUrl}/admin/product/updateProduct/${id}`, data);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${environment.baseUrl}/admin/product/deleteProduct/${id}`);
  }

  getOrder(fromDate: any , toDate: any) {
    if(fromDate !== null && toDate !== null) {
      return this.http.get(`${environment.baseUrl}/admin/order/list?fromDate=${fromDate}&toDate=${toDate}&status=Paid`);
    } else {
      return this.http.get(`${environment.baseUrl}/admin/order/list`);
    }
  }

  getOrderByID(id: any) {
    return this.http.get(`${environment.baseUrl}/admin/order/findById/${id}`);
  }

  deleteOrder(id: any) {
    return this.http.delete(`${environment.baseUrl}/admin/order/deleteOrder/${id}`);
  }

}
