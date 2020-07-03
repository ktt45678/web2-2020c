import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-layout',
  templateUrl: './side-layout.component.html',
  styleUrls: ['./side-layout.component.scss']
})
export class SideLayoutComponent implements OnInit {
  shouldRun = true;

  constructor() { }

  ngOnInit(): void {
  }

}
