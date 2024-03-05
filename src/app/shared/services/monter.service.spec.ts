import { TestBed } from '@angular/core/testing';

import { MonterService } from './monter.service';

describe('MonterService', () => {
  let service: MonterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
