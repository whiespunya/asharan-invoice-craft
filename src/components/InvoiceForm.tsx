
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import InvoiceHeader from './InvoiceHeader';
import { PLANS, generateInvoiceId, getCurrentDate, calculateDueDate, validateInvoiceForm } from '@/utils/invoiceUtils';
import { InvoiceData, InvoiceItem } from '@/types/invoice';
import { toast } from '@/components/ui/use-toast';
import { Separator } from "@/components/ui/separator";

interface InvoiceFormProps {
  onGenerateInvoice: (invoiceData: InvoiceData) => void;
}

const InvoiceForm = ({ onGenerateInvoice }: InvoiceFormProps) => {
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [customItems, setCustomItems] = useState<InvoiceItem[]>([]);
  const [customItemName, setCustomItemName] = useState('');
  const [customItemPrice, setCustomItemPrice] = useState('');

  const handleAddCustomItem = () => {
    if (!customItemName.trim() || !customItemPrice.trim() || isNaN(Number(customItemPrice)) || Number(customItemPrice) <= 0) {
      toast({
        title: "Invalid item",
        description: "Please enter a valid item name and price",
        variant: "destructive",
      });
      return;
    }

    const price = Number(customItemPrice);
    const newItem: InvoiceItem = {
      name: customItemName,
      quantity: 1,
      price: price,
      total: price,
    };

    setCustomItems([...customItems, newItem]);
    setCustomItemName('');
    setCustomItemPrice('');

    toast({
      title: "Item added",
      description: `${customItemName} has been added to the invoice`,
    });
  };

  const handleGenerateInvoice = () => {
    if (!validateInvoiceForm(clientName, selectedPlan)) {
      return;
    }

    const planItem: InvoiceItem = {
      name: `${selectedPlan} Plan - ${PLANS[selectedPlan].desc}`,
      quantity: 1,
      price: PLANS[selectedPlan].price,
      total: PLANS[selectedPlan].price,
    };

    const allItems = [planItem, ...customItems];
    const subtotal = allItems.reduce((sum, item) => sum + item.total, 0);

    const invoiceData: InvoiceData = {
      clientName,
      phoneNumber,
      invoiceId: generateInvoiceId(),
      issueDate: getCurrentDate(),
      dueDate: calculateDueDate(),
      items: allItems,
      subtotal,
    };

    onGenerateInvoice(invoiceData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Invoice</CardTitle>
        <CardDescription>Generate a professional invoice for your client</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <InvoiceHeader />
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input 
              id="clientName" 
              placeholder="e.g. PT Maju Jaya" 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Client Phone Number</Label>
            <Input 
              id="phoneNumber" 
              placeholder="e.g. 081234567890" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="plan">Select Plan</Label>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger id="plan">
                <SelectValue placeholder="-- Pilih Paket --" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PLANS).map(([key, plan]) => (
                  <SelectItem key={key} value={key}>
                    {key} - Rp. {plan.price.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-3">Add Custom Items</h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customItem">Item Name</Label>
                <Input 
                  id="customItem" 
                  placeholder="e.g. Domain, Maintenance" 
                  value={customItemName}
                  onChange={(e) => setCustomItemName(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="customPrice">Price (Rp)</Label>
                <Input 
                  id="customPrice" 
                  type="number" 
                  placeholder="e.g. 150000" 
                  value={customItemPrice}
                  onChange={(e) => setCustomItemPrice(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddCustomItem}
              className="w-full md:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Custom Item
            </Button>
          </div>
          
          {customItems.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Custom Items</h4>
              <div className="bg-muted rounded-md p-3">
                <ul className="space-y-1">
                  {customItems.map((item, index) => (
                    <li key={index} className="text-sm flex justify-between">
                      <span>{item.name}</span>
                      <span>Rp. {item.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <Button onClick={handleGenerateInvoice} className="w-full">
          Generate Invoice
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
