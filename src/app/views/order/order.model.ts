export class OrderModel {
  vendorName: string;
  address: string;
  city: string;
  state: string;
  gstin: string;
  zipcode: string;
  invoiceNo: string;
  date: string;
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
  invoiceDate: string;
}


export class Product {
  productName: string;
  description: string;
  qty: number;
  rate: number;
  amount: string;
}
