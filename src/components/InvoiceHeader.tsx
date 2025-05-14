
import React from 'react';
import { cn } from "@/lib/utils";

interface InvoiceHeaderProps {
  className?: string;
  preview?: boolean;
}

const InvoiceHeader = ({ className, preview = false }: InvoiceHeaderProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start gap-6", className)}>
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-primary">ASHARAN DIGITAL SOLUTION INDONESIA</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Jl. Contoh No.123<br />
          Indonesia<br />
          admin@asharan.co.id<br />
          08123456789
        </p>
      </div>
      
      <div className="bg-primary/10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center">
        <span className="text-xl md:text-2xl font-bold text-primary">ADS</span>
      </div>
    </div>
  );
};

export default InvoiceHeader;
