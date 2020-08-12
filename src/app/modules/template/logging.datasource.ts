import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

import { ManagementService } from '../../services/management.service';
import { LoggingModel } from '../models/logging.model';

export class LoggingDataSource implements DataSource<LoggingModel>{

  private logsSubject = new BehaviorSubject<LoggingModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private pageLengthSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.pageLengthSubject.asObservable();

  constructor(private management: ManagementService) { }

  connect(collectionViewer: CollectionViewer): Observable<LoggingModel[] | readonly LoggingModel[]> {
    return this.logsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.logsSubject.complete();
    this.loadingSubject.complete();
    this.pageLengthSubject.complete();
  }

  loadLogs(start: number, limit: number, type: string, keyword: string) {
    this.loadingSubject.next(true);
    this.management.findAuditLogs(start, limit, type, keyword).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(data => {
      this.pageLengthSubject.next(data.count);
      this.logsSubject.next(data.list);
    });
  }
}