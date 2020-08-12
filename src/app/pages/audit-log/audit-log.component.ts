import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { fromEvent, Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from '../../services/management.service';
import { NotificationService } from '../../services/notification.service';
import { LoggingDataSource } from '../../modules/template/logging.datasource';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
  providers: [ManagementService]
})
export class AuditLogComponent implements OnInit {
  dataSource: LoggingDataSource;
  displayedColumns: string[] = ['time', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('search') searchInput: ElementRef;
  @ViewChild(MatSelect) select: MatSelect;
  subscriptions = new Subscription();

  constructor(private manage: ManagementService) {}

  ngOnInit(): void {
    this.dataSource = new LoggingDataSource(this.manage);
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200), distinctUntilChanged(), tap(() => {
      this.paginator.pageIndex = 0;
      this.loadUsersPage();
    })).subscribe());
    this.subscriptions.add(this.paginator.page.pipe(tap(() => this.loadUsersPage())).subscribe());
    this.subscriptions.add(this.select.selectionChange.pipe(tap(() => this.loadUsersPage())).subscribe());
    this.loadUsersPage();
  }

  loadUsersPage() {
    this.dataSource.loadLogs(this.paginator.pageIndex, this.paginator.pageSize, this.select.value, this.searchInput.nativeElement.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
