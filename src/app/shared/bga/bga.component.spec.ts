import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgAComponent } from './bga.component';

describe('BgAComponent', () => {
  let component: BgAComponent;
  let fixture: ComponentFixture<BgAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
