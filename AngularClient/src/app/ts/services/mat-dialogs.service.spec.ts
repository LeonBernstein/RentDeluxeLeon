/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatDialogsService } from './mat-dialogs.service';

describe('Service: MatDialogs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatDialogsService]
    });
  });

  it('should ...', inject([MatDialogsService], (service: MatDialogsService) => {
    expect(service).toBeTruthy();
  }));
});
