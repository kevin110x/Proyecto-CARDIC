import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosPage } from './consejos.page';

describe('ConsejosPage', () => {
  let component: ConsejosPage;
  let fixture: ComponentFixture<ConsejosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
