import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './modules/auth-guard.module';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivationComponent } from './pages/activation/activation.component';
import { PasswordRecoveryComponent } from './pages/passwordrecovery/passwordrecovery.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FAQComponent } from './pages/faq/faq.component';
import { AboutComponent } from './pages/about/about.component'
import { ContactComponent } from './pages/contact/contact.component';
import { PolicyComponent } from './pages/policy/policy.component';

import { HomeLayoutComponent } from './shared/home-layout/home-layout.component';
import { MatLayoutComponent } from './shared/mat-layout/mat-layout.component';
import { SideLayoutComponent } from './shared/side-layout/side-layout.component';

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
  {
    path: '',
    component: MatLayoutComponent,
    children: [
      { path: 'faq', component: FAQComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'policy', component: PolicyComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'activate', component: ActivationComponent },
      { path: 'passwordrecovery', component: PasswordRecoveryComponent }
    ]
  },
  // Dashboard routes
  {
    path: 'dashboard',
    component: SideLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate:[AuthGuard] }
    ]
  },
  // No layout
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
