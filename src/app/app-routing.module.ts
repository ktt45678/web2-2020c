import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './modules/guard/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { HomeLayoutComponent } from './shared/home-layout/home-layout.component';

const matModule = () => import('./modules/routing/mat.module').then(x => x.PageModule);
const sideModule = () => import('./modules/routing/side.module').then(x => x.SideModule);

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
  { path: '**', redirectTo: '404' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
