import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { fromEvent, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from '../../services/management.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { AccountDataSource } from '../../modules/template/account.datasource';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
  providers: [ManagementService]
})
export class AccountManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() userId: string;
  currentUser: UserModel;
  dataSource: AccountDataSource;
  displayedColumns: string[] = ['id', 'balance', 'account_type', 'term', 'status', 'view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('search') searchInput: ElementRef;
  @ViewChild(MatSelect) select: MatSelect;
  subscriptions = new Subscription();

  constructor(private auth: AuthenticationService, private manage: ManagementService, private notification: NotificationService, private user: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    this.dataSource = new AccountDataSource(this.manage, this.user);
  }

  ngAfterViewInit(): void {
    if (this.searchInput && this.paginator && this.select) {
      this.subscriptions.add(fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadAccountsPage();
      })).subscribe());
      this.subscriptions.add(this.paginator.page.pipe(tap(() => this.loadAccountsPage())).subscribe());
      this.subscriptions.add(this.select.selectionChange.pipe(tap(() => this.loadAccountsPage())).subscribe());
    }
    if (this.currentUser) {
      this.loadAccountsPage();
    }
  }

  loadAccountsPage() {
    if (this.currentUser.userType === 0) {
      this.dataSource.loadAccounts(this.paginator.pageIndex, this.paginator.pageSize, this.select.value, this.searchInput.nativeElement.value, this.userId);
      return;
    }
    this.dataSource.loadAccounts(this.paginator.pageIndex, this.paginator.pageSize, this.select.value, this.searchInput.nativeElement.value);
  }

  closeAccount(account) {
    this.manage.updateAccountStatus(account.accountId, 0).subscribe(
    () => {
      account.status = 0;
      this.notification.showSuccess(`Đã đóng tài khoản ${account.accountId}`);
    }, () => {
      this.notification.showError('Đã có lỗi xảy ra');
    });
  }

  openAccount(account) {
    this.manage.updateAccountStatus(account.accountId, 1).subscribe(
    () => {
      account.status = 1;
      this.notification.showSuccess(`Đã mở lại tài khoản ${account.accountId}`);
    }, () => {
      this.notification.showError('Đã có lỗi xảy ra');
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
