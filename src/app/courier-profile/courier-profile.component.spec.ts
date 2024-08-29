import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierProfileComponent } from './courier-profile.component';

describe('CourierProfileComponent', () => {
  let component: CourierProfileComponent;
  let fixture: ComponentFixture<CourierProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourierProfileComponent]
    });
    fixture = TestBed.createComponent(CourierProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
