import { TestBed } from '@angular/core/testing';

import { FightingService } from './fighting.service';

describe('FightingService', () => {
  let service: FightingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FightingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
