/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WillService } from './will.service';

describe('Service: Will', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WillService]
    });
  });

  it('should ...', inject([WillService], (service: WillService) => {
    expect(service).toBeTruthy();
  }));
});
