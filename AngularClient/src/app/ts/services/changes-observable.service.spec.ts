/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChangesService } from '../ts/services/changes.service';

describe('Service: ChangesObservable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangesService]
    });
  });

  it('should ...', inject([ChangesService], (service: ChangesService) => {
    expect(service).toBeTruthy();
  }));
});
