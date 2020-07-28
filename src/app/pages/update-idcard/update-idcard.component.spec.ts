import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIdCardComponent } from './update-idcard.component';

describe('UpdateIdCardComponent', () => {
  let component: UpdateIdCardComponent;
  let fixture: ComponentFixture<UpdateIdCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIdCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
