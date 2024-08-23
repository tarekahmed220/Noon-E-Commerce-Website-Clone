import { TestBed } from '@angular/core/testing';

import { GetsomeproductsService } from './getsomeproducts.service';

describe('GetsomeproductsService', () => {
  let service: GetsomeproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetsomeproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
