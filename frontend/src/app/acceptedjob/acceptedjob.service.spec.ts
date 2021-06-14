import { TestBed } from '@angular/core/testing';

import { AcceptedjobService } from './acceptedjob.service';

describe('AcceptedjobService', () => {
  let service: AcceptedjobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptedjobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
