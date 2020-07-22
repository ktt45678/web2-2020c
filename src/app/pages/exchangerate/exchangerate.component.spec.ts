import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerateComponent } from './exchangerate.component';

describe('ExchangerateComponent', () => {
  let component: ExchangerateComponent;
  let fixture: ComponentFixture<ExchangerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
