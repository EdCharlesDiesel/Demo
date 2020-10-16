import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEppComponent } from './add-epp.component';

describe('AddEppComponent', () => {
  let component: AddEppComponent;
  let fixture: ComponentFixture<AddEppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
