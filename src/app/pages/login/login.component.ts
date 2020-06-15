import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

}
