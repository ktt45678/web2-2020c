import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

import { TransactionService } from '../../services/transaction.service';
import { TransactionModel } from '../models/transaction.model';

export class TransactionDataSource implements DataSource<TransactionModel>{

  private transactionsSubject = new BehaviorSubject<TransactionModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private pageLengthSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.pageLengthSubject.asObservable();

  constructor(private transaction: TransactionService) { }

  connect(collectionViewer: CollectionViewer): Observable<TransactionModel[] | readonly TransactionModel[]> {
    return this.transactionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.transactionsSubject.complete();
    this.loadingSubject.complete();
    this.pageLengthSubject.complete();
  }

  loadTransactions(start: number, limit: number, from: string, to: string, type: string, accountId?: string) {
    this.loadingSubject.next(true);
    this.transaction.findTransactions(start, limit, from, to, type, accountId).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(data => {
      this.pageLengthSubject.next(data.count);
      this.transactionsSubject.next(data.list);
    });
  }
}