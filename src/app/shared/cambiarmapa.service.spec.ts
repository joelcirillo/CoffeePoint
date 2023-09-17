import { TestBed } from '@angular/core/testing';

import { CambiarmapaService } from './cambiarmapa.service';

describe('CambiarmapaService', () => {
  let service: CambiarmapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambiarmapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
