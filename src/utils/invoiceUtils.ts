
import html2pdf from 'html2pdf.js';
import { InvoiceData, InvoiceItem, Plans } from '../types/invoice';
import { toast } from '@/components/ui/use-toast';

export const PLANS: Plans = {
  Basic: { price: 500000, desc: "Landing page, katalog online sederhana" },
  "Standard Business": { price: 1200000, desc: "Website profil + galeri/layanan" },
  Premium: { price: 2500000, desc: "Website lengkap + fitur kontak & form lead" },
};

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('id-ID');
}

export function calculateDueDate(days: number = 14): string {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + days);
  return dueDate.toISOString().split('T')[0];
}

export function generateInvoiceId(): string {
  return `ADSINV-${Date.now()}`;
}

export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function generatePDF(invoiceData: InvoiceData): void {
  const element = document.getElementById("invoice-for-pdf");
  if (!element) {
    toast({
      title: "Error",
      description: "Invoice element not found",
      variant: "destructive"
    });
    return;
  }

  const filename = `ADSINV-${Date.now()}-${invoiceData.clientName.replace(/\s+/g, "_")}.pdf`;
  const options = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  toast({
    title: "Generating PDF",
    description: "Your invoice is being generated...",
  });

  html2pdf()
    .set(options)
    .from(element)
    .save()
    .then(() => {
      toast({
        title: "Success",
        description: "Invoice PDF generated successfully",
      });
    })
    .catch((err) => {
      console.error("Error generating PDF:", err);
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    });
}

export function validateInvoiceForm(clientName: string, planKey: string, customItems: InvoiceItem[]): boolean {
  if (!clientName.trim()) {
    toast({
      title: "Validation Error",
      description: "Please enter a client name",
      variant: "destructive",
    });
    return false;
  }

  if (!planKey && customItems.length === 0) {
    toast({
      title: "Validation Error",
      description: "Please select a plan or add at least one custom item",
      variant: "destructive",
    });
    return false;
  }

  return true;
}
