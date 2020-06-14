import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('staticNavbar') staticNavbar: ElementRef;
  sticky: boolean = false;
  navbarPosition: any;

  constructor() { }

  ngOnInit(): void {
  }

}
