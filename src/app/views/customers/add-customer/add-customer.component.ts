import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  allState:any = [];
  state:any = [];
  cities:any = [];
  submitted: boolean = false;
  customerId: any;
  customerDetail: any;

  customerForm:any = FormGroup;
  constructor(private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeForm();
    this.getAllState();
    this.route.paramMap.subscribe( paramMap => {
      this.customerId = paramMap.get('id');
      if(this.customerId) {
        this.getCustomerDetails(this.customerId);
      }
  })
  }

  initializeForm() {
    this.customerForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl(""),
      phoneNumber: new FormControl("", Validators.required),
      state: new FormControl(""),
      city: new FormControl(""),
      address: new FormControl(""),
      role: new FormControl("customer"),
      password: new FormControl("abc@123"),
    })
  }

  get f() {
    return this.customerForm.controls;
  }

  getAllState() {
    this.customerService.getAllState().subscribe((data : any) => {
      if(data) {
        this.allState = data.states;
        this.cities = this.allState[0].districts;
      }
    })
  }

  updateDistrict(e: any) {
    let stateIndex = this.allState.findIndex((x : any) => x.state === e.target.value);
    if(stateIndex > -1) {
      this.cities = this.allState[stateIndex].districts;
    }
  }

  saveCustomer() {
    this.submitted = true;

    if(!this.customerForm.valid) {
      return;
    }

    if(!this.customerId) {
      this.customerService.saveCustomer(this.customerForm.value).subscribe((data:any) => {
        if(data) {
          this.toastrService.success('Customer created successfully', 'Customer');
          this.router.navigate(['customers']);
        }
      });
    } else {
      this.customerService.updateCustomer(this.customerForm.value).subscribe((data:any) => {
        if(data) {
          this.toastrService.success('Customer updated successfully', 'Customer');
          this.router.navigate(['customers']);
        }
      });
    }

  }

  getCustomerDetails(customerId: any) {
    this.customerService.getCustomerById(customerId).subscribe((res:any) => {
      if(res) {
        this.customerDetail = res.user;
        let stateIndex = this.allState.findIndex((x : any) => x.state === this.customerDetail.state);
        if(stateIndex > -1) {
          this.cities = this.allState[stateIndex].districts;
        }
        this.setCustomerInfo(this.customerDetail);
      }
    })
  }

  setCustomerInfo(customer: any) {
    this.customerForm = new FormGroup({
      _id: new FormControl(customer._id),
      firstName: new FormControl(customer.firstName, Validators.required),
      lastName: new FormControl(customer.lastName, Validators.required),
      email: new FormControl(customer.email),
      phoneNumber: new FormControl(customer.phoneNumber, Validators.required),
      state: new FormControl(customer.state),
      city: new FormControl(customer.city),
      address: new FormControl(customer.address),
      role: new FormControl("customer"),
      password: new FormControl("abc@123"),
    })
  }

  backCustomer() {
    this.router.navigate(['customers']);
  }

}
