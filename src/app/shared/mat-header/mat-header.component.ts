import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavService } from '../../services/component.service';

@Component({
  selector: 'app-mat-header',
  templateUrl: './mat-header.component.html',
  styleUrls: ['./mat-header.component.scss']
})
export class MatHeaderComponent implements OnInit {
  shouldRun = true;
  showSideNavButton = false;

  constructor(private router: Router, private sideNavService: SidenavService) { }

  ngOnInit(): void {
    if (this.router.url.startsWith('/dashboard')) {
      this.showSideNavButton = true;
    }
  }

  openSideNav() {
    this.sideNavService.open();
  }

}
