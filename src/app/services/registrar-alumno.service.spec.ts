import { TestBed } from '@angular/core/testing';

import { RegistrarAlumnoService } from './registrar-alumno.service';

describe('RegistrarAlumnoService', () => {
  let service: RegistrarAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
