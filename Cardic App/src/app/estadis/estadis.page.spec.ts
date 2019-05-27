import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisPage } from './estadis.page';

describe('EstadisPage', () => {
  let component: EstadisPage;
  let fixture: ComponentFixture<EstadisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
