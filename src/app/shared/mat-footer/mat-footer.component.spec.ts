import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFooterComponent } from './mat-footer.component';

describe('MatFooterComponent', () => {
  let component: MatFooterComponent;
  let fixture: ComponentFixture<MatFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
