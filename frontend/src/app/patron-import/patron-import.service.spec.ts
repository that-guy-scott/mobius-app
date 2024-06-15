import { TestBed } from '@angular/core/testing';

import { PatronImportService } from './patron-import.service';

describe('PatronImportService', () => {
  let service: PatronImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatronImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
