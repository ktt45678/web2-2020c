import { Component, OnInit } from '@angular/core';
import { faPiggyBank, faChartLine, faWallet, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-featured',
  templateUrl: './home-featured.component.html',
  styleUrls: ['./home-featured.component.scss']
})
export class HomeFeaturedComponent implements OnInit {

  faPiggyBank = faPiggyBank;
  faChartLine = faChartLine;
  faWallet = faWallet;
  faShieldAlt = faShieldAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
