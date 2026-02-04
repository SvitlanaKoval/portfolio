export type InvoiceStatus = "Open" | "Paid" | "Denied";

export type Invoice = {
  id: string;
  accountName: string;     // sanitized: no real names
  invoiceNumber: string;   // fake format: INV-1001
  serviceDate: string;     // YYYY-MM-DD
  amountCents: number;
  status: InvoiceStatus;
  notes?: string;
  updatedAt: number;       // epoch ms
};
