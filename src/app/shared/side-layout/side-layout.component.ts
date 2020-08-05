import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { SidenavService } from '../../services/component.service';

@Component({
  selector: 'app-side-layout',
  templateUrl: './side-layout.component.html',
  styleUrls: ['./side-layout.component.scss']
})
export class SideLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sideNav') public sideNav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private auth: AuthenticationService, private sideNavService: SidenavService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit(): void {
    //this.auth.getCurrentUser().pipe(first()).subscribe(user => {});
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSidenav(this.sideNav);
  }

  closeSideNav() {
    this.sideNavService.close();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
