import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: any = FormGroup;
  submitted: boolean = false;
  productId: any;
  productDetails: any;

  constructor(private productService: ProductService,
              private router: Router,
              private toastrService: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initProductForm();
    this.route.paramMap.subscribe( paramMap => {
      this.productId = paramMap.get('id');
      if(this.productId) {
        this.getProductDetails(this.productId);
      }
    })
  }

  initProductForm() {
    this.productForm = new FormGroup({
      productName: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      priceWithoutGST: new FormControl("", Validators.required),
    })
  }

  get f() {
    return this.productForm.controls;
  }

  saveProduct() {
    this.submitted = true;
    if(!this.productForm.valid) {
      return;
    }

    if(!this.productId) {
      this.productService.saveProduct(this.productForm.value).subscribe((data:any) => {
        if(data) {
          this.toastrService.success('Product added successfully');
          this.router.navigate(['product']);
        }
      })
    } else {
      this.productService.updateProduct(this.productDetails._id,this.productForm.value).subscribe((data:any) => {
        if(data) {
          this.toastrService.success('Product updated successfully');
          this.router.navigate(['product']);
        }
      })
    }


  }

  getProductDetails(productId: any) {
    this.productService.getProductById(productId).subscribe((data: any) => {
      if(data && data.product) {
        this.productDetails = data.product;
        this.updateProductForm();
      }
    })
  }

  updateProductForm() {
    this.productForm = new FormGroup({
      productName: new FormControl(this.productDetails.productName, Validators.required),
      price: new FormControl(this.productDetails.price, Validators.required),
      priceWithoutGST: new FormControl(this.productDetails.priceWithoutGST, Validators.required),
    })
  }

  backCustomer() {
    this.router.navigate(['product']);
  }

}
