import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatLayoutComponent } from '../../shared/mat-layout/mat-layout.component';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ActivationComponent } from '../../pages/activation/activation.component';
import { PasswordRecoveryComponent } from '../../pages/password-recovery/password-recovery.component';
import { FAQComponent } from '../../pages/faq/faq.component';
import { AboutComponent } from '../../pages/about/about.component';
import { ContactComponent } from '../../pages/contact/contact.component';
import { PolicyComponent } from '../../pages/policy/policy.component';
import { ExchangerateComponent } from '../../pages/exchangerate/exchangerate.component';
import { SecurityPolicyComponent } from '../../pages/security-policy/security-policy.component';
import { ServicesComponent } from '../../pages/services/services.component';
import { Error403Component } from '../../pages/error403/error403.component';
import { Error404Component } from '../../pages/error404/error404.component';


const routes: Routes = [
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
      { path: 'passwordrecovery', component: PasswordRecoveryComponent },
      { path: 'exchangerate', component: ExchangerateComponent },
      { path: 'security-policy', component: SecurityPolicyComponent },
      { path: 'services', component: ServicesComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatRoutingModule { }