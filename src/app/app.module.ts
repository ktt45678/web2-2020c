import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeHeaderComponent } from './shared/home-header/home-header.component';
import { HomeFooterComponent } from './shared/home-footer/home-footer.component';
import { MatHeaderComponent } from './shared/mat-header/mat-header.component';
import { MatFooterComponent } from './shared/mat-footer/mat-footer.component';
import { MatSidenavComponent } from './shared/mat-sidenav/mat-sidenav.component';
import { HomeBannerComponent } from './shared/home-banner/home-banner.component';
import { HomeFeaturedComponent } from './shared/home-featured/home-featured.component';
import { BgAComponent } from './shared/bga/bga.component';
import { HomeLayoutComponent } from './shared/home-layout/home-layout.component';
import { MatLayoutComponent } from './shared/mat-layout/mat-layout.component';
import { SideLayoutComponent } from './shared/side-layout/side-layout.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivationComponent } from './pages/activation/activation.component';
import { PasswordRecoveryComponent } from './pages/passwordrecovery/passwordrecovery.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FAQComponent } from './pages/faq/faq.component';
import { AboutComponent } from './pages/about/about.component';

import { JwtInterceptor } from './modules/jwt-interceptor.module';
import { ErrorInterceptor } from './modules/error-interceptor.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { ContactComponent } from './pages/contact/contact.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    MatHeaderComponent,
    MatFooterComponent,
    MatSidenavComponent,
    HomeBannerComponent,
    HomeFeaturedComponent,
    BgAComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ActivationComponent,
    PasswordRecoveryComponent,
    DashboardComponent,
    FAQComponent,
    AboutComponent,
    ContactComponent,
    PolicyComponent,
    HomeLayoutComponent,
    MatLayoutComponent,
    SideLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSnackBarModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatStepperModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
