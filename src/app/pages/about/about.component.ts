import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],

})
export class AboutComponent implements OnInit {
  FacebookIcon = faFacebook;
  GithubIcon = faGithub;
  // defaultImage ="/assets/img/center-placeholder.png";
  // lazyloadedImage ="/assets/img/center.png";
  // profileDefaultImage ="/assets/img/upper-placeholder.png";
  // profileLazyloadedImage ="/assets/img/upper.png";
  constructor() {}

  ngOnInit(): void {

  }

}
