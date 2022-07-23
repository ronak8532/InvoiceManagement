import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';

declare var $: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerList: any;
  deleteCustomerDetail: any;
  deleteModal: boolean = false;

  constructor(private customerService: CustomerService,
              private router: Router,
              private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.getAllCustomerList();
  }

  getAllCustomerList() {
    this.customerService.getAllCustomer().subscribe((data:any) => {
      if(data && data.users) {
        this.customerList = data.users;
      }
    })
  }

  createCustomer() {
    this.router.navigate(['/customers/create']);
  }

  updateCustomer(customer:any) {
    this.router.navigate([`/customers/update/${customer._id}`]);
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.deleteCustomerDetail._id).subscribe((data:any) => {
      if(data) {
        this.toastrService.success('Customer deleted successfully', 'Customer');
        this.closeModal();
      }
    })
  }

  deleteConfirmation(customer: any) {
    this.deleteCustomerDetail = null;
    $('#deleteModal').modal('show');
    this.deleteCustomerDetail = customer;
  }

  closeModal() {
    this.deleteCustomerDetail = null;
    $('#deleteModal').modal('hide');

  }

}
