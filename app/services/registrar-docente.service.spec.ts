import { TestBed } from '@angular/core/testing';

import { RegistrarDocenteService } from './registrar-docente.service';

describe('RegistrarDocenteService', () => {
  let service: RegistrarDocenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarDocenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
