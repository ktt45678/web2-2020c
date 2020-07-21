import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideLayoutComponent } from '../shared/side-layout/side-layout.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: SideLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideRoutingModule { }