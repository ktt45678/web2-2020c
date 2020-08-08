export class TransferModel {
  method: string;
  from: string;
  to: string;
  amount: number;
  description?: string;
  bank?: string;
  fee?: number;
  currency?: string;
}