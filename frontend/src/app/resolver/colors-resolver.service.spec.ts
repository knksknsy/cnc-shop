import { TestBed, inject } from '@angular/core/testing';

import { ColorsResolverService } from './colors-resolver.service';

describe('ColorsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorsResolverService]
    });
  });

  it('should be created', inject([ColorsResolverService], (service: ColorsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
