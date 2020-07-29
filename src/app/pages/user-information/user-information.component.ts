import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ManagementService } from '../../services/management.service'
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  providers: [ManagementService]
})
export class UserInformationComponent implements OnInit {
  userId: string;
  selectedUser: UserModel;

  constructor(private route: ActivatedRoute, private manage: ManagementService, private location: Location) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.manage.findUser(this.userId).subscribe(data => this.selectedUser = data);
  }

  return() {
    this.location.back();
  }

}
