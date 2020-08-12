import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-live-rate',
  templateUrl: './live-rate.component.html',
  styleUrls: ['./live-rate.component.scss']
})

export class LiveRateComponent implements OnInit {
  VND :string;
  USD :string;
  constructor(private user:UserService) { }

  ngOnInit(): void {
    this.user.getRate().subscribe(data =>{
      this.USD = data.vndusd;
      this.VND = data.usdvnd;
    })
  }

}
