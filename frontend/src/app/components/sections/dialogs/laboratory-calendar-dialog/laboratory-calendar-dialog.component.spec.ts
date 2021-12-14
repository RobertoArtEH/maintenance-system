import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryCalendarDialogComponent } from './laboratory-calendar-dialog.component';

describe('LaboratoryCalendarDialogComponent', () => {
  let component: LaboratoryCalendarDialogComponent;
  let fixture: ComponentFixture<LaboratoryCalendarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryCalendarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
