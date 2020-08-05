import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalModificationComponent } from './personal-modification.component';

describe('PersonalModificationComponent', () => {
  let component: PersonalModificationComponent;
  let fixture: ComponentFixture<PersonalModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
