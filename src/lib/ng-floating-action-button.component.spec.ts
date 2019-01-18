import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFloatingActionButtonComponent } from './ng-floating-action-button.component';

describe('NgFloatingActionButtonComponent', () => {
  let component: NgFloatingActionButtonComponent;
  let fixture: ComponentFixture<NgFloatingActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFloatingActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFloatingActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
