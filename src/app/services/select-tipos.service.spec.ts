import { TestBed } from '@angular/core/testing';

import { SelectTiposService } from './select-tipos.service';

describe('SelectTiposService', () => {
  let service: SelectTiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectTiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
