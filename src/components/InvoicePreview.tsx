
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
            <div className="mt-2 space-y-3 text-sm">
              <div>
                <p><span className="font-medium">Bank:</span> BRI</p>
                <p><span className="font-medium">No. Rek:</span> <span className="font-bold italic">339801041234531</span></p>
                <p><span className="font-medium">Atas Nama:</span> <span className="font-bold italic">REY RIFA ERLANGGA</span></p>
                <p><span className="font-medium">Ref:</span> Rey</p>
              </div>
              
              <div className="mt-3">
                <p><span className="font-medium">Bank:</span> BRI</p>
                <p><span className="font-medium">No. Rek:</span> <span className="font-bold italic">579801023895503</span></p>
                <p><span className="font-medium">Atas Nama:</span> <span className="font-bold italic">Muhammad Ilham Alprasy</span></p>
                <p><span className="font-medium">Ref:</span> Ilham</p>
              </div>
              
              <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                <p className="font-bold">PERINGATAN:</p>
                <p className="text-justify">Pembayaran hanya dilakukan ke rekening yang tercantum di atas. Segala bentuk permintaan transfer ke rekening lain atau atas nama pribadi adalah penipuan dan sepenuhnya di luar tanggung jawab kami.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold">KETENTUAN LAYANAN:</h4>
            <div className="mt-2 text-sm space-y-2">
              <p>1. Maksimal revisi adalah 2x. Revisi tambahan akan dikenakan biaya sesuai tingkat kompleksitas perubahan.</p>
              <p>2. Harap mengisi form dengan data yang jelas dan lengkap agar proses pengerjaan berjalan lancar dan sesuai harapan.</p>
              <p>3. Estimasi waktu pengerjaan akan dimulai setelah form diisi lengkap dan pembayaran DP (Down Payment) diterima.</p>
              <p>4. DP minimum 50% dari total biaya proyek wajib dibayarkan di awal sebagai tanda jadi.</p>
              <p>5. Sisa pembayaran dilakukan sebelum file final diserahkan atau website dipublikasikan.</p>
              <p>6. Garansi teknis berlaku selama 7 hari setelah proyek selesai untuk perbaikan bug atau kesalahan sistem (tidak termasuk perubahan fitur/desain).</p>
              <p>7. Klien wajib menyimpan backup data secara berkala setelah proyek diselesaikan.</p>
              <p>8. Komunikasi dan revisi dilakukan melalui media yang telah disepakati (WhatsApp/email).</p>
              <p>9. Dengan melakukan pembayaran, klien dianggap telah menyetujui seluruh ketentuan layanan ini.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Pembayaran maksimal 1x24 jam. Hubungi kami untuk garansi atau kebijakan pengembalian.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoicePreview;
