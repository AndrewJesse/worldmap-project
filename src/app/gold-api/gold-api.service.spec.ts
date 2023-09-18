import { TestBed } from '@angular/core/testing';

import { GoldApiService } from './gold-api.service';

describe('GoldApiService', () => {
  let service: GoldApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoldApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
