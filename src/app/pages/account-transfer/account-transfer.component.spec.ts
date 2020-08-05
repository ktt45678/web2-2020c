import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransferComponent } from './account-transfer.component';

describe('AccountTransferComponent', () => {
  let component: AccountTransferComponent;
  let fixture: ComponentFixture<AccountTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
