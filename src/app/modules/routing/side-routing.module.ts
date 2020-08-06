import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleGuard } from '../guard/role.guard';
import { ActivateGuard } from '../guard/activate.guard';

import { SideLayoutComponent } from '../../shared/side-layout/side-layout.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UpdateAvatarComponent } from '../../pages/update-avatar/update-avatar.component';
import { UpdateIdCardComponent } from '../../pages/update-idcard/update-idcard.component';
import { UpdatePasswordComponent } from '../../pages/update-password/update-password.component';
import { PersonalInformationComponent } from '../../pages/personal-information/personal-information.component';
import { PersonalModificationComponent } from '../../pages/personal-modification/personal-modification.component';
import { UserManagementComponent } from '../../pages/user-management/user-management.component';
import { UserInformationComponent } from '../../pages/user-information/user-information.component';
import { UserModificationComponent } from '../../pages/user-modification/user-modification.component';
import { AccountCreationComponent } from '../../pages/account-creation/account-creation.component';
import { AccountManagementComponent } from '../../pages/account-management/account-management.component';
import { AccountInformationComponent } from '../../pages/account-information/account-information.component';
import { AccountModificationComponent } from '../../pages/account-modification/account-modification.component';
import { AuditLogComponent } from '../../pages/audit-log/audit-log.component';
import { TransactionHistoryComponent } from '../../pages/transaction-history/transaction-history.component';

const routes: Routes = [
  {
    path: '',
    component: SideLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'update-avatar', component: UpdateAvatarComponent },
      { path: 'update-idcard', component: UpdateIdCardComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: 'personal', component: PersonalInformationComponent },
      { path: 'personal/edit', component: PersonalModificationComponent },
      { path: 'users', component: UserManagementComponent, canActivate: [RoleGuard] },
      { path: 'users/view/:userid', component: UserInformationComponent, canActivate: [RoleGuard] },
      { path: 'users/edit/:userid', component: UserModificationComponent, canActivate: [RoleGuard] },
      { path: 'accounts', component: AccountManagementComponent, canActivate: [ActivateGuard] },
      { path: 'accounts/create/:userid', component: AccountCreationComponent, canActivate: [RoleGuard] },
      { path: 'accounts/view/:accountid', component: AccountInformationComponent, canActivate: [RoleGuard] },
      { path: 'accounts/edit/:accountid', component: AccountModificationComponent, canActivate: [RoleGuard] },
      { path: 'log', component: AuditLogComponent, canActivate: [RoleGuard] },
      { path: 'history', component: TransactionHistoryComponent, canActivate: [ActivateGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideRoutingModule { }