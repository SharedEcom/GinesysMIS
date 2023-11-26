import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootfallComponent } from './footfall.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('FootfallComponent', () => {
  let component: FootfallComponent;
  let fixture: ComponentFixture<FootfallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootfallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


