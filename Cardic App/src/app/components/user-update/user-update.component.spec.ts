import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatePage } from './user-update.page';

describe('UserUpdatePage', () => {
  let component: UserUpdatePage;
  let fixture: ComponentFixture<UserUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
