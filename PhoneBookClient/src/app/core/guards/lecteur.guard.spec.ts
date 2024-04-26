import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { lecteurGuard } from './lecteur.guard';

describe('lecteurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => lecteurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
