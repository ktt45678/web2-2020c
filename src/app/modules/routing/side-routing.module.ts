import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      { path: 'users', component: UserManagementComponent },
      { path: 'users/view/:userid', component: UserInformationComponent },
      { path: 'users/edit/:userid', component: UserModificationComponent },
      { path: 'accounts', component: AccountManagementComponent },
      { path: 'accounts/create/:userid', component: AccountCreationComponent },
      { path: 'accounts/view/:accountid', component: AccountInformationComponent },
      { path: 'accounts/edit/:accountid', component: AccountModificationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideRoutingModule { }