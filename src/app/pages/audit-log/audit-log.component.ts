import { Component, OnInit } from '@angular/core';

import { ManagementService } from '../../services/management.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
  providers: [ManagementService]
})
export class AuditLogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
