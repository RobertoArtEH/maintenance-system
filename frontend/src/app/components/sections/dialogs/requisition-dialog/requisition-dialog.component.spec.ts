import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionDialogComponent } from './requisition-dialog.component';

describe('RequisitionDialogComponent', () => {
  let component: RequisitionDialogComponent;
  let fixture: ComponentFixture<RequisitionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
