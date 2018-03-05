/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BucketService } from './bucket.service';

describe('BucketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketService]
    });
  });

  it('should ...', inject([BucketService], (service: BucketService) => {
    expect(service).toBeTruthy();
  }));
});
