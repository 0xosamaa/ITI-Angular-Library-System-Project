import { TestBed } from '@angular/core/testing';

import { BasicAdminGuard } from './basic-admin.guard';

describe('BasicAdminGuard', () => {
  let guard: BasicAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BasicAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
