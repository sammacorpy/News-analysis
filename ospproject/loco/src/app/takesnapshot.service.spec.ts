import { TestBed } from '@angular/core/testing';

import { TakesnapshotService } from './takesnapshot.service';

describe('TakesnapshotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TakesnapshotService = TestBed.get(TakesnapshotService);
    expect(service).toBeTruthy();
  });
});
