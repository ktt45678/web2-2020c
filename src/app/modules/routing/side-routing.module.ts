import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideLayoutComponent } from '../../shared/side-layout/side-layout.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UpdateIdCardComponent } from '../../pages/update-idcard/update-idcard.component';
import { UserManagementComponent } from '../../pages/user-management/user-management.component';
import { UserInformationComponent } from '../../pages/user-information/user-information.component';
import { UserModificationComponent } from '../../pages/user-modification/user-modification.component';

const routes: Routes = [
  {
    path: '',
    component: SideLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'updateidcard', component: UpdateIdCardComponent },
      { path: 'usermanagement', component: UserManagementComponent },
      { path: 'usermanagement/view/:userid', component: UserInformationComponent },
      { path: 'usermanagement/edit/:userid', component: UserModificationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideRoutingModule { }