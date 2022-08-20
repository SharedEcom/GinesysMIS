import { TestBed } from '@angular/core/testing';

import { ItemInfoServiceService } from './item-info-service.service';

describe('ItemInfoServiceService', () => {
  let service: ItemInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
