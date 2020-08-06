import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

import { ManagementService } from '../../services/management.service';
import { UserModel } from '../models/user.model';

export class UserDataSource implements DataSource<UserModel>{

  private usersSubject = new BehaviorSubject<UserModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private pageLengthSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.pageLengthSubject.asObservable();

  constructor(private management: ManagementService) { }

  connect(collectionViewer: CollectionViewer): Observable<UserModel[] | readonly UserModel[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
    this.pageLengthSubject.complete();
  }

  loadUsers(start: number, limit: number, type: string, keyword: string) {
    this.loadingSubject.next(true);
    this.management.findUsers(start, limit, type, keyword).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(data => {
      this.pageLengthSubject.next(data.count);
      this.usersSubject.next(data.list);
    });
  }
}