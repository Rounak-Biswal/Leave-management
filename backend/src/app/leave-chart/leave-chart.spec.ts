import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveChart } from './leave-chart';

describe('LeaveChart', () => {
  let component: LeaveChart;
  let fixture: ComponentFixture<LeaveChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
