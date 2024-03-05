import { TestBed } from '@angular/core/testing';

import { ArmorService } from './armor.service';

describe('ArmourService', () => {
  let service: ArmorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
