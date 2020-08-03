import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { faShieldAlt, faHandHoldingUsd , faBolt , faPiggyBank , faMobileAlt , faCubes} from '@fortawesome/free-solid-svg-icons';
//import { faPiggyBank, faChartLine, faWallet, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  faShieldAlt = faShieldAlt;
  faHandHoldingUsd = faHandHoldingUsd;
  faBolt = faBolt;
  faPiggyBank = faPiggyBank;
  faMobileAlt = faMobileAlt;
  faCubes = faCubes;
  constructor() { }

  ngOnInit(): void {
    AOS.init({
      duration: 1200
    });
  }

}
