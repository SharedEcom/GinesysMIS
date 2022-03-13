import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoSignageComponent } from './promo-signage.component';

describe('PromoSignageComponent', () => {
  let component: PromoSignageComponent;
  let fixture: ComponentFixture<PromoSignageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoSignageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoSignageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
