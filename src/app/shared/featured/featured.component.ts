import { Component, OnInit } from '@angular/core';
import { faPiggyBank, faChartLine, faWallet, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  faPiggyBank = faPiggyBank;
  faChartLine = faChartLine;
  faWallet = faWallet;
  faShieldAlt = faShieldAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
