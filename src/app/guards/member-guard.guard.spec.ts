import { TestBed } from '@angular/core/testing';

import { MemberGuardGuard } from './member-guard.guard';

describe('MemberGuardGuard', () => {
  let guard: MemberGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MemberGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
