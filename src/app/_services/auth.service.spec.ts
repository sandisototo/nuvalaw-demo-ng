import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const sessionSpy = jasmine.createSpyObj(['exists', 'setCookieAndRedirect']);

  beforeEach(() => {
    sessionSpy.exists.and.resolveTo(false);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
