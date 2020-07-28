import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideLayoutComponent } from '../../shared/side-layout/side-layout.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UpdateIdCardComponent } from '../../pages/update-idcard/update-idcard.component';
import { UserManagementComponent } from '../../pages/user-management/user-management.component';

const routes: Routes = [
  {
    path: '',
    component: SideLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'updateidcard', component: UpdateIdCardComponent },
      { path: 'usermanagement', component: UserManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideRoutingModule { }