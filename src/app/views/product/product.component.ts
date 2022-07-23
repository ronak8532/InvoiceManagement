import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList: any;
  deleteProductDetail: any;

  constructor(private productService: ProductService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe((data: any) => {
      if(data) {
        this.productList = data.product;
      }
    });
  }

  createProduct() {
    this.router.navigate(['/product/create']);
  }

  updateProduct(product: any) {
    this.router.navigate([`/product/update/${product._id}`]);
  }

  deleteConfirmation(product: any) {
    this.deleteProductDetail = null;
    $('#deleteModal').modal('show');
    this.deleteProductDetail = product;
  }

  closeModal() {
    this.deleteProductDetail = null;
    $('#deleteModal').modal('hide');
  }

  deleteCustomer() {
    this.productService.deleteProduct(this.deleteProductDetail._id).subscribe((data: any) => {
      if(data && data.success) {
        this.toastrService.success('Product deleted successfully', 'Customer');
        let index = this.productList.findIndex((x:any) => x._id === this.deleteProductDetail._id);
        if(index > -1) {
          this.productList.splice(index, 1);
        }
        this.closeModal();
      }
    });
  }

}
