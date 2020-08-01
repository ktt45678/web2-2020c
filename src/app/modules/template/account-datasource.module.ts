import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

import { ManagementService } from '../../services/management.service';
import { AccountModel } from '../../models/account.model';

export class AccountDataSource implements DataSource<AccountModel>{

  private accountsSubject = new BehaviorSubject<AccountModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private pageLengthSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.pageLengthSubject.asObservable();

  constructor(private management: ManagementService) { }

  connect(collectionViewer: CollectionViewer): Observable<AccountModel[] | readonly AccountModel[]> {
    return this.accountsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.accountsSubject.complete();
    this.loadingSubject.complete();
    this.pageLengthSubject.complete();
  }

  loadAccounts(start: number, limit: number, type: string, keyword: string) {}
}