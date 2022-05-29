import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoSignagePrintComponent } from './promo-signage-print.component';

describe('PromoSignagePrintComponent', () => {
  let component: PromoSignagePrintComponent;
  let fixture: ComponentFixture<PromoSignagePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoSignagePrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoSignagePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
