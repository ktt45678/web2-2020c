import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedComponent } from './home-featured.component';

describe('HomeFeaturedComponent', () => {
  let component: HomeFeaturedComponent;
  let fixture: ComponentFixture<HomeFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
