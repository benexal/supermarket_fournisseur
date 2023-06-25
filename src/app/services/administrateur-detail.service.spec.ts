import { TestBed } from '@angular/core/testing';

import { AdministrateurDetailService } from './administrateur-detail.service';

describe('AdministrateurDetailService', () => {
  let service: AdministrateurDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrateurDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
