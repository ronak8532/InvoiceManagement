import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  orderForm:any = FormGroup;
  productForm: any = FormGroup;
  submitted: boolean = false;
  customerList: any;
  keyword = 'firstName';
  invoiceNo: any;
  qtyList:any = [50,100,150,200,250,300,350,400,450,500];
  taxList:any = ["No Tax","GST: 18%"];
  subtotal: any = 0;
  cgst: any = 0;
  sgst: any = 0;
  total: any = 0;
  roundOff: any = 0;
  grandtotal: any = 0;
  courier: any = 0;
  orderId: any;
  orderDetail: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private customerService:CustomerService,
              private orderService: OrderService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initOrderForm();
    this.getAllCustomer();
    this.generateInvoiceNo();
    this.route.paramMap.subscribe( paramMap => {
      this.orderId = paramMap.get('id');
      if(this.orderId) {
        this.getOrderDetail(this.orderId);
      }
  })
  }

  initOrderForm() {
    this.orderForm = new FormGroup({
      invoiceNo: new FormControl(this.invoiceNo, Validators.required),
      customerInfo: new FormControl('', Validators.required),
      products: this.fb.array([this.addProductForm()]),
      courier:new FormControl(0)
    })
    //this.orderForm.controls['invoiceNo'].disable();
  }

  addProductForm() {
    return this.fb.group({
      productName: ["", Validators.required],
      description: [""],
      qty: [50, Validators.required],
      rate: [0, Validators.required],
      amount: [0, Validators.required]
    });
  }

  getOrderDetail(id : any) {
    this.orderService.getOrderByID(id).subscribe((res: any) => {
      if(res) {
        this.orderDetail = res.order;
        this.setOrderInfo(this.orderDetail);
      }
    })
  }

  setOrderInfo(order: any) {
    // this.orderForm = new FormGroup({
    //   invoiceNo: new FormControl(order.invoiceNo, Validators.required),
    //   customerInfo: new FormControl(order.customerInfo, Validators.required),
    //   products: this.fb.array([this.updateProduct(order)]),
    //   courier:new FormControl(order.courier)
    // })
    // this.orderForm.controls['products'].setValue(order.products);
    // this.orderForm.controls["customerInfo"].setValue(order.customerInfo);
    // this.orderForm.controls['products'].setValue(order.products);
    // this.orderForm.patchValue(order);
    // console.log("order", this.orderForm);
  }

  addProduct(): void {
    (<FormArray>this.orderForm.get("products")).push(
      this.addProductForm()
    );
  }

  updateProduct(order: any): void {
    (<FormArray>this.orderForm.get("products")).push(order.products);
  }

  removeProduct(i: any) {
    if(i === 0) {
      return;
    }
    (this.orderForm.get("products")).removeAt(i);
  }

  generateInvoiceNo() {
    this.orderService.getLastOrder().subscribe((res: any) => {
      if(res && res.invoiceNo) {
        let lastInvoiceNo = Number(res.invoiceNo);
        this.invoiceNo = lastInvoiceNo + 1;
        if(this.invoiceNo < 999) {
          this.invoiceNo = ('000' + this.invoiceNo).substr(-3);
        } else if(this.invoiceNo > 999) {
          this.invoiceNo = ('0000' + this.invoiceNo).substr(-4);
        }
        this.invoiceNo = this.getInvoiceNumber(this.invoiceNo);
        this.orderForm.get('invoiceNo').setValue(this.invoiceNo);
      }
    },(err) => {
      this.invoiceNo = this.getInvoiceNumber(null);
      this.orderForm.get('invoiceNo').setValue(this.invoiceNo);
    })
  }

  getInvoiceNumber(lastInvoiceNo: any) {
    if(!lastInvoiceNo) {
      return 'MF/' + this.getCurrentFinancialYear() + '/001';
    } else {
      return 'MF/' + this.getCurrentFinancialYear() + '/' + lastInvoiceNo;
    }
  }

  getCurrentFinancialYear() {
    var fiscalyear = "";
    var today = new Date();
    if ((today.getMonth() + 1) <= 3) {
      let x = ('' + (today.getFullYear() - 1)).slice(2,4);
      let y = ('' + today.getFullYear()).slice(2,4);
      fiscalyear = x + "-" + y;
    } else {
      let a = ('' + today.getFullYear()).slice(2,4);
      let b = ('' + (today.getFullYear() + 1)).slice(2,4);
      fiscalyear =  a + "-" + b
    }
    return fiscalyear
  }

  get f() {
    return this.orderForm.controls;
  }

  get p() {
    return this.productForm.controls;
  }

  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe((res: any) => {
      if(res && res.users) {
        this.customerList = res.users;
      }
    })
  }

  backOrder() {
    this.router.navigate(['order']);
  }

  productTotal(product: any) {
    let totalAmount = product.value.qty * product.value.rate;
    product.patchValue({amount: totalAmount.toFixed(2)});
    this.subTotal();
  }

  subTotal() {
    this.subtotal = this.orderForm.controls.products.value.reduce(
      (accumulator: any, currentValue: any) => accumulator + parseFloat(currentValue.amount), 0);
      this.subtotal = this.subtotal + this.orderForm.controls.courier.value;
      this.subtotal = parseFloat(this.subtotal).toFixed(2);
    this.GSTCalculation(this.subtotal);
  }

  GSTCalculation(subtotal: number) {
    this.cgst = (subtotal * 9 / 100).toFixed(2);
    this.sgst = (subtotal * 9 / 100).toFixed(2);
    this.total = +subtotal + parseFloat(this.cgst) + parseFloat(this.sgst);
    this.total = parseFloat(this.total).toFixed(2);
    this.roundOffCalculation(this.total);
  }

  roundOffCalculation(total: any) {
    let roundoff = (Math.round(parseFloat(total))).toFixed(2);
    this.roundOff = (parseFloat(roundoff) - parseFloat(total)).toFixed(2);
    this.grandtotal = Number(roundoff);
  }

  saveOrder() {
    this.submitted = true;
    if(!this.orderForm.valid) {
      return;
    }
    let orderValue = {
      status: 'Placed',
      subtotal: this.subtotal,
      cgst: this.cgst,
      sgst: this.sgst,
      total: this.total,
      roundoff: this.roundOff,
      grandtotal: this.grandtotal
    }
    let order = {
      ...this.orderForm.value, ...orderValue
    }
    this.orderService.placeOrder(order).subscribe((res: any) => {
      if(res && res.success) {
        this.router.navigate(['order']);
      }
    })
  }

}
