import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  getAllProduct() {
   return this.http.get(`${environment.baseUrl}/admin/product/list`);
  }

  saveProduct(data: any) {
    return this.http.post(`${environment.baseUrl}/admin/product/addProduct`, data);
  }

  getProductById(id: any) {
    return this.http.get(`${environment.baseUrl}/admin/product/findById/${id}`);
  }

  updateProduct(id:any, data: any) {
    return this.http.post(`${environment.baseUrl}/admin/product/updateProduct/${id}`, data);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${environment.baseUrl}/admin/product/deleteProduct/${id}`);
  }

}
