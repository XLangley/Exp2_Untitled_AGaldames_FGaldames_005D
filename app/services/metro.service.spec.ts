import { TestBed } from '@angular/core/testing';

import { MetroService } from './metro.service';

describe('MetroService', () => {
  let service: MetroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
