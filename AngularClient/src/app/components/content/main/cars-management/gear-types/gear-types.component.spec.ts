/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GearTypesComponent } from './gear-types.component';

describe('GearTypesComponent', () => {
  let component: GearTypesComponent;
  let fixture: ComponentFixture<GearTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
