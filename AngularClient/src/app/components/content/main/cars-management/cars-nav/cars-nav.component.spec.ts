/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarsNavComponent } from './cars-nav.component';

describe('CarsNavComponent', () => {
  let component: CarsNavComponent;
  let fixture: ComponentFixture<CarsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
