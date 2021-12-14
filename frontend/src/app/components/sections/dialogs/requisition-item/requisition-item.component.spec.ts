import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionItemComponent } from './requisition-item.component';

describe('RequisitionItemComponent', () => {
  let component: RequisitionItemComponent;
  let fixture: ComponentFixture<RequisitionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
