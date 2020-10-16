import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillEditComponent } from './will-edit.component';

describe('WillEditComponent', () => {
  let component: WillEditComponent;
  let fixture: ComponentFixture<WillEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
