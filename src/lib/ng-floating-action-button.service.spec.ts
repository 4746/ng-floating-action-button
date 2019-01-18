import { TestBed } from '@angular/core/testing';

import { NgFloatingActionButtonService } from './ng-floating-action-button.service';

describe('NgFloatingActionButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgFloatingActionButtonService = TestBed.get(NgFloatingActionButtonService);
    expect(service).toBeTruthy();
  });
});
