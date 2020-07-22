import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './modules/auth-guard.module';


import { HomeComponent } from './pages/home/home.component';
import { HomeLayoutComponent } from './shared/home-layout/home-layout.component';

const matModule = () => import('./modules/mat.module').then(x => x.PageModule);
const sideModule = () => import('./modules/side.module').then(x => x.SideModule);


const routes: Routes = [
  // Home routes
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  // App routes
  { path: '', loadChildren: matModule },
  // Dashboard routes
  { path: '', loadChildren: sideModule, canActivate: [AuthGuard] },
  // No layout
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
