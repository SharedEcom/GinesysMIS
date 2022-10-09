import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraUdfComponent } from './extra-udf.component';

describe('ExtraUdfComponent', () => {
  let component: ExtraUdfComponent;
  let fixture: ComponentFixture<ExtraUdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraUdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraUdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
