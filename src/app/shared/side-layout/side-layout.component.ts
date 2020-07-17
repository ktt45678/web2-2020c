import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { SidenavService } from '../../services/component.service';

@Component({
  selector: 'app-side-layout',
  templateUrl: './side-layout.component.html',
  styleUrls: ['./side-layout.component.scss']
})
export class SideLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav') public sideNav: MatSidenav;
  shouldRun = true;

  constructor(private sideNavService: SidenavService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSidenav(this.sideNav);
  }

}
