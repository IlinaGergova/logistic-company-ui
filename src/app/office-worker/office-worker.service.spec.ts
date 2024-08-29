import { TestBed } from '@angular/core/testing';

import { OfficeWorkerService } from './office-worker.service';

describe('OfficeWorkerService', () => {
  let service: OfficeWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
