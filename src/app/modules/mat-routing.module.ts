import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatLayoutComponent } from '../shared/mat-layout/mat-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ActivationComponent } from '../pages/activation/activation.component';
import { PasswordRecoveryComponent } from '../pages/passwordrecovery/passwordrecovery.component';
import { FAQComponent } from '../pages/faq/faq.component';
import { AboutComponent } from '../pages/about/about.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { PolicyComponent } from '../pages/policy/policy.component';
import { ExchangerateComponent } from '../pages/exchangerate/exchangerate.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatRoutingModule { }