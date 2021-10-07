import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedRequestComponent } from './signed-request.component';

describe('SignedRequestComponent', () => {
  let component: SignedRequestComponent;
  let fixture: ComponentFixture<SignedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
