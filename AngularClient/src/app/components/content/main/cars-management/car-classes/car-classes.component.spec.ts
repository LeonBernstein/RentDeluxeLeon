/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarClassesComponent } from './car-classes.component';

describe('CarClassesComponent', () => {
  let component: CarClassesComponent;
  let fixture: ComponentFixture<CarClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
