export class OrderModel {
  vendorName: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  invoiceNo: string;
  date: Date;
  products: Product[];
  subtotal: number;
  courier: string;
  taxable_amt: string;
  cgst: string;
  sgst: string;
  roundoff: string;
  grand_total: string;
  total_gst: string;
  bill_amt: string;
  gst_word: string;
}


export class Product {
  productName: string;
  description: string;
  qty: number;
  rate: number;
  amount: string;
}
