import { TestBed } from '@angular/core/testing';

import { MyServiceService } from './auth.service';

describe('AuthService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
