import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatheaderComponent } from './shared/matheader/matheader.component';
import { MatfooterComponent } from './shared/matfooter/matfooter.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordRecoveryComponent } from './pages/passwordrecovery/passwordrecovery.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FAQComponent } from './pages/faq/faq.component';
import { SupportComponent } from './pages/support/support.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'passwordrecovery', component: PasswordRecoveryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'faq', component: FAQComponent},
  { path: 'support', component: SupportComponent },
  { path: '**', redirectTo: '' },
  { path: '', component: HeaderComponent, outlet: "header" },
  { path: '', component: FooterComponent, outlet: "footer" },
  { path: 'matheader', component: MatheaderComponent, outlet: "header" },
  { path: 'matfooter', component: MatfooterComponent, outlet: "footer" }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
