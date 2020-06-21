import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatfooterComponent } from './matfooter.component';

describe('MatfooterComponent', () => {
  let component: MatfooterComponent;
  let fixture: ComponentFixture<MatfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
