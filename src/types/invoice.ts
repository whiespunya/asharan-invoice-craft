
export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Plan {
  price: number;
  desc: string;
}

export interface Plans {
  [key: string]: Plan;
}

export interface InvoiceData {
  clientName: string;
  phoneNumber?: string;
  invoiceId: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
}
