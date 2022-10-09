import { TestBed } from '@angular/core/testing';

import { PromoSignagePrintService } from './promo-signage-print.service';

describe('PromoSignagePrintService', () => {
  let service: PromoSignagePrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoSignagePrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
