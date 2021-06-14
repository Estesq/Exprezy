import { TestBed } from '@angular/core/testing';

import { ViewreqService } from './viewreq.service';

describe('ViewreqService', () => {
  let service: ViewreqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewreqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
