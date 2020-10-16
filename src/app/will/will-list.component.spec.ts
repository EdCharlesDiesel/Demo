/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WillListComponent } from './will-list.component';

describe('WillListComponent', () => {
  let component: WillListComponent;
  let fixture: ComponentFixture<WillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
