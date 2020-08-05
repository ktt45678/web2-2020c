import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountWithdrawalComponent } from './account-withdrawal.component';

describe('AccountWithdrawalComponent', () => {
  let component: AccountWithdrawalComponent;
  let fixture: ComponentFixture<AccountWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
