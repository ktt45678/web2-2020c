// Core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

// Shared components
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

// Dynamic components
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivationComponent } from './pages/activation/activation.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UpdateIdCardComponent } from './pages/update-idcard/update-idcard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { FAQComponent } from './pages/faq/faq.component';
import { AboutComponent } from './pages/about/about.component';
import { ExchangerateComponent } from './pages/exchangerate/exchangerate.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PolicyComponent } from './pages/policy/policy.component';

// Services, modules
import { JwtInterceptor } from './modules/jwt-interceptor.module';
import { ErrorInterceptor } from './modules/error-interceptor.module';

// Angular material
import { MatMenuModule } from '@angular/material/menu';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { SecurityPolicyComponent } from './pages/security-policy/security-policy.component';
import { ServicesComponent } from './pages/services/services.component';
import { Error403Component } from './pages/error403/error403.component';
import { Error404Component } from './pages/error404/error404.component';

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
    UpdateIdCardComponent,
    FAQComponent,
    AboutComponent,
    ContactComponent,
    PolicyComponent,
    HomeLayoutComponent,
    MatLayoutComponent,
    ExchangerateComponent,
    SideLayoutComponent,
    UserManagementComponent,
    SecurityPolicyComponent,
    ServicesComponent,
    Error403Component,
    Error404Component
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
    MatMenuModule,
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
    MatTooltipModule,
    LazyLoadImageModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: [environment.apiUrl]
      }
    })
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: RECAPTCHA_SETTINGS, useValue: { siteKey: environment.reCaptchaKey } as RecaptchaSettings }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
