import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllLeaves } from './show-all-leaves';

describe('ShowAllLeaves', () => {
  let component: ShowAllLeaves;
  let fixture: ComponentFixture<ShowAllLeaves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllLeaves]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllLeaves);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
