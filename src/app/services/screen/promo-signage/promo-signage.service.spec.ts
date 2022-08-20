import { TestBed } from '@angular/core/testing';

import { PromoSignageService } from './promo-signage.service';

describe('PromoSignageService', () => {
  let service: PromoSignageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoSignageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
