import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryCalendarComponent } from './laboratory-calendar.component';

describe('LaboratoryCalendarComponent', () => {
  let component: LaboratoryCalendarComponent;
  let fixture: ComponentFixture<LaboratoryCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
