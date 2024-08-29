import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeWorkerProfileComponent } from './office-worker-profile.component';

describe('OfficeWorkerProfileComponent', () => {
  let component: OfficeWorkerProfileComponent;
  let fixture: ComponentFixture<OfficeWorkerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficeWorkerProfileComponent]
    });
    fixture = TestBed.createComponent(OfficeWorkerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
