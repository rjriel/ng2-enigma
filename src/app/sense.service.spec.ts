/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SenseService } from './sense.service';

describe('Service: Sense', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SenseService]
    });
  });

  it('should ...', inject([SenseService], (service: SenseService) => {
    expect(service).toBeTruthy();
  }));
});
