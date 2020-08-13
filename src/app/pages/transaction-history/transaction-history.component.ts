import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef, Inject, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { Subscription, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { TransactionService } from '../../services/transaction.service';
import { NotificationService } from '../../services/notification.service';
import { TransactionDataSource } from '../../modules/template/transaction.datasource';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
  providers: [TransactionService]
})
export class TransactionHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() accountId: string;
  @Input() detailView = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  dataSource: TransactionDataSource;
  displayedColumns: string[] = ['id', 'time', 'content', 'description', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;
  @ViewChild('search') searchInput: ElementRef;
  @ViewChild(MatSelect) select: MatSelect;
  subscriptions = new Subscription();

  constructor(private transaction: TransactionService, private notification: NotificationService, private dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.dataSource = new TransactionDataSource(this.transaction);
  }

  ngAfterViewInit(): void {
    if (this.detailView) {
      this.subscriptions.add(fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadTransactionsPage();
      })).subscribe());
      this.subscriptions.add(this.paginator.page.pipe(tap(() => this.loadTransactionsPage())).subscribe());
      this.subscriptions.add(this.select.selectionChange.pipe(tap(() => this.loadTransactionsPage())).subscribe());
    }
    this.loadTransactionsPage();
  }

  onDateFilterChange() {
    if (this.startDate.nativeElement.value && this.endDate.nativeElement.value) {
      this.paginator.pageIndex = 0;
      this.loadTransactionsPage();
    }
  }

  loadTransactionsPage() {
    if (!this.detailView) {
      this.dataSource.loadTransactions(0, 5, '', '', '', '');
      return;
    }
    this.dataSource.loadTransactions(this.paginator.pageIndex, this.paginator.pageSize, this.startDate.nativeElement.value, this.endDate.nativeElement.value, this.select.value, this.searchInput.nativeElement.value, this.accountId);
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  viewDescription(description) {
    this.dialog.open(TransactionDescriptionDialog, { data: description });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

@Component({
  selector: 'dialog-transaction-description',
  templateUrl: './transaction-description.dialog.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionDescriptionDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}