
import React from 'react';
import { InvoiceData } from '@/types/invoice';
import InvoiceHeader from './InvoiceHeader';
import InvoiceTable from './InvoiceTable';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface InvoicePreviewProps {
  data: InvoiceData;
}

const InvoicePreview = ({ data }: InvoicePreviewProps) => {
  return (
    <Card className="mt-8 print:shadow-none print:border-none" id="invoice-for-pdf">
      <CardContent className="p-6 md:p-8">
        <InvoiceHeader preview={true} />
        
        <div className="flex flex-col md:flex-row justify-between mt-8">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-primary">INVOICE</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm"><span className="font-medium">Invoice No:</span> {data.invoiceId}</p>
              <p className="text-sm"><span className="font-medium">Issue Date:</span> {data.issueDate}</p>
              <p className="text-sm"><span className="font-medium">Due Date:</span> {data.dueDate}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:text-right">
            <h4 className="font-bold">BILL TO</h4>
            <p className="mt-1">{data.clientName}</p>
          </div>
        </div>
        
        <InvoiceTable items={data.items} subtotal={data.subtotal} />
        
        <Separator className="my-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold">PAY BY BANK TRANSFER</h4>
            <div className="mt-2 space-y-1 text-sm">
              <p><span className="font-medium">Bank:</span> BCA</p>
              <p><span className="font-medium">No. Rek:</span> 1234567890</p>
              <p><span className="font-medium">Atas Nama:</span> ASHARAN DIGITAL SOLUTION</p>
              <p><span className="font-medium">Ref:</span> {data.clientName}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold">TERMS</h4>
            <p className="mt-2 text-sm">Pembayaran dalam 14 hari. Hubungi kami untuk garansi atau kebijakan pengembalian.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Terima kasih atas kerjasama Anda!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoicePreview;
