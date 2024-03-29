import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { OrderService } from 'src/app/services/order.service';
import {OrderModel} from './order.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  hidePDF: boolean = false;
  orders : any;
  orderModel = new OrderModel();
  deleteOrderDetail: any;
  constructor(private router: Router,
            private orderService: OrderService,
            private toastrService: ToastrService,
            private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.orderList();
  }

  orderList() {
    this.spinner.show();
    this.orderService.getOrder(null, null).subscribe((res:any) => {
      if(res) {
        this.orders = res.order;
        this.orders.map((x : any) => {
          const d = new Date();
          let day = this.days_between(new Date(x.updated_at), d);
          x.due =  day;
        })
        this.spinner.hide();
      }
    },(err) => {
      this.spinner.hide();
    })
  }

  public days_between(date1:any, date2:any) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

  }

  public openPDF(order: any): void {

    this.preparePDFModel(order);

    setTimeout(() => {this.downloadPDF(order)},500);
  }

  preparePDFModel(order: any) {
    this.orderModel.vendorName = order.customerInfo.firstName + ' ' + order.customerInfo.lastName;
    this.orderModel.address = order.customerInfo.address;
    this.orderModel.city = order.customerInfo.city;
    this.orderModel.state = order.customerInfo.state;
    this.orderModel.zipcode = order.customerInfo.zipcode;
    this.orderModel.gstin = order.customerInfo.gstin;
    this.orderModel.invoiceNo = order.invoiceNo;
    this.orderModel.date = this.dateToYMD(new Date());
    this.orderModel.invoiceDate = this.dateToYMD(new Date(order.invoiceDate));
    this.orderModel.products = order.products;
    this.orderModel.subtotal = Number(order.subtotal) - Number(order.courier);
    this.orderModel.courier = order.courier;
    this.orderModel.taxable_amt = order.subtotal;
    this.orderModel.cgst = order.cgst;
    this.orderModel.sgst = order.sgst;
    this.orderModel.roundoff = order.roundoff;
    this.orderModel.grand_total = order.grandtotal;
    this.orderModel.gst_word = (parseInt(order.cgst) + parseInt(order.sgst)).toString();
  }

  downloadPDF(order: any) {
    this.spinner.show();
    if(screen.width < 1024) {
      const webView = document.getElementById("viewportMeta");
      if(webView != null) {
        webView.setAttribute("content", "width=1500px");
       }
    }
    let DATA: any = document.getElementById('htmlData');
    window.scrollTo(0,0);
    html2canvas(DATA,
      {
        scale: 3,
        onclone: function (clonedDoc: any) {
          clonedDoc.getElementById('htmlData').style.display = 'block';
      }
      }).then((canvas) => {
        if(screen.width < 1024) {
          const webView = document.getElementById("viewportMeta");
          if(webView != null) {
            webView.setAttribute("content", "width=device-width, initial-scale=1");
          }
        }
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', [290, 210]);
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      var today = this.dateToYMD(new Date());
      PDF.save(`${this.orderModel.vendorName}-${today}.pdf`);
      this.spinner.hide();
    });
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }

  createOrder() {
    this.router.navigate(['/order/create']);
  }

  dateToYMD(date: any) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + (m<=9 ? '0' + m : m) + '-' + y;
}


  deleteOrder() {
    this.orderService.deleteOrder(this.deleteOrderDetail._id).subscribe((data:any) => {
      if(data) {
        this.toastrService.success('Order deleted successfully', 'Order');
        this.closeModal();
      }
    })
  }

  deleteConfirmation(order: any) {
    this.deleteOrderDetail = null;
    $('#deleteModal').modal('show');
    this.deleteOrderDetail = order;
  }

  closeModal() {
    this.deleteOrderDetail = null;
    $('#deleteModal').modal('hide');
    this.orderList();
  }

  updateOrder(order:any) {
    this.router.navigate([`/order/update/${order._id}`]);
  }
}
