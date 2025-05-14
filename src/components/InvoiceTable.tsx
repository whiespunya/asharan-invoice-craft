
import React from 'react';
import { InvoiceItem } from '@/types/invoice';
import { formatCurrency } from '@/utils/invoiceUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface InvoiceTableProps {
  items: InvoiceItem[];
  subtotal: number;
}

const InvoiceTable = ({ items, subtotal }: InvoiceTableProps) => {
  return (
    <div className="mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Description</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">Rp. {formatCurrency(item.price)}</TableCell>
              <TableCell className="text-right">Rp. {formatCurrency(item.total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 flex flex-col items-end">
        <div className="w-full md:w-1/3 space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Subtotal:</span>
            <span>Rp. {formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-primary">Rp. {formatCurrency(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
