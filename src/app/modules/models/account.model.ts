export class AccountModel {
  accountId: string;
  userId: string;
  status: number;
  balance: string;
  currencyType: string;
  accountType: number;
  openedDate: string;
  closedDate?: string;
  term?: number;
  startTermDate?: string;
  createdAt: string;
}