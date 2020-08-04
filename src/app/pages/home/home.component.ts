import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  defaultImage ="../../../assets/img/header-banner-placeholder.jpg";
  lazyloadedImage ="../../../assets/img/header-banner.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
