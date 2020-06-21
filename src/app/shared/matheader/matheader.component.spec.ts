import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatheaderComponent } from './matheader.component';

describe('MatheaderComponent', () => {
  let component: MatheaderComponent;
  let fixture: ComponentFixture<MatheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
