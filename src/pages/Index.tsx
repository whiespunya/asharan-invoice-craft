
import React, { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import { InvoiceData } from '@/types/invoice';
import { Toaster } from '@/components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("form");

  const handleGenerateInvoice = (data: InvoiceData) => {
    setInvoiceData(data);
    setActiveTab("preview");
  };

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">ASHARAN Invoice Generator</h1>
          <p className="text-muted-foreground">Create professional invoices for your clients</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form">Create Invoice</TabsTrigger>
            <TabsTrigger value="preview" disabled={!invoiceData}>Preview & Generate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-4">
            <InvoiceForm onGenerateInvoice={handleGenerateInvoice} />
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            {invoiceData && <InvoicePreview data={invoiceData} />}
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
