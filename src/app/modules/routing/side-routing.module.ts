import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideLayoutComponent } from '../../shared/side-layout/side-layout.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UpdateAvatarComponent } from '../../pages/update-avatar/update-avatar.component';
import { UpdateIdCardComponent } from '../../pages/update-idcard/update-idcard.component';
import { UpdatePasswordComponent } from '../../pages/update-password/update-password.component';
import { PersonalModificationComponent } from '../../pages/personal-modification/personal-modification.component';
import { UserManagementComponent } from '../../pages/user-management/user-management.component';
import { UserInformationComponent } from '../../pages/user-information/user-information.component';
import { UserModificationComponent } from '../../pages/user-modification/user-modification.component';

const routes: Routes = [
  {
    path: '',
    component: SideLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'update-avatar', component: UpdateAvatarComponent },
      { path: 'update-idcard', component: UpdateIdCardComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: 'personal-edit', component: PersonalModificationComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'user-management/view/:userid', component: UserInformationComponent },
      { path: 'user-management/edit/:userid', component: UserModificationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideRoutingModule { }