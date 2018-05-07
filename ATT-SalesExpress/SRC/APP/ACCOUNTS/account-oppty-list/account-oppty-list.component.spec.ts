/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountOpptyListComponent } from './account-oppty-list.component';

describe('AccountOpptyListComponent', () => {
  let component: AccountOpptyListComponent;
  let fixture: ComponentFixture<AccountOpptyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountOpptyListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpptyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO: Add test specs
});
