import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { fromEvent, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from '../../services/management.service';
import { NotificationService } from '../../services/notification.service';
import { UserModel } from '../../modules/models/user.model';
import { UserDataSource } from '../../modules/template/user.datasource';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [ManagementService]
})
export class UserManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  currentUser: UserModel;
  dataSource: UserDataSource;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'address', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('search') searchInput: ElementRef;
  @ViewChild(MatSelect) select: MatSelect;
  subscriptions = new Subscription();

  constructor(private auth: AuthenticationService, private manage: ManagementService, private notification: NotificationService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    this.dataSource = new UserDataSource(this.manage);
  }

  ngAfterViewInit(): void {
    if (this.searchInput && this.paginator && this.select) {
      this.subscriptions.add(fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadUsersPage();
      })).subscribe());
      this.subscriptions.add(this.paginator.page.pipe(tap(() => this.loadUsersPage())).subscribe());
      this.subscriptions.add(this.select.selectionChange.pipe(tap(() => this.loadUsersPage())).subscribe());
    }
    if (this.currentUser && this.currentUser.userType === 0) {
      this.loadUsersPage();
    }
  }

  loadUsersPage() {
    this.dataSource.loadUsers(this.paginator.pageIndex, this.paginator.pageSize, this.select.value, this.searchInput.nativeElement.value);
  }

  viewUser(user) {
    this.router.navigate(['view', user.id], { relativeTo: this.route });
  }

  editUser(user) {
    this.router.navigate(['edit', user.id], { relativeTo: this.route });
  }

  blockUser(user) {
    this.manage.updateUserStatus(user.id, 0).subscribe(
    () => {
      user.status = 0;
      this.notification.showSuccess(`Đã chặn ${user.firstName} ${user.lastName}`);
    }, error => {
      this.showError(error);
    });
  }

  unblockUser(user) {
    this.manage.updateUserStatus(user.id, 1).subscribe(
    () => {
      user.status = 1;
      this.notification.showSuccess(`Đã bỏ chặn ${user.firstName} ${user.lastName}`);
    }, error => {
      this.showError(error);
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
