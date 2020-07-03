import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.scss']
})
export class MatSidenavComponent implements OnInit {
  shouldRun = true;

  constructor() { }

  ngOnInit(): void {
  }

}
