import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLayoutComponent } from './mat-layout.component';

describe('MatLayoutComponent', () => {
  let component: MatLayoutComponent;
  let fixture: ComponentFixture<MatLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
