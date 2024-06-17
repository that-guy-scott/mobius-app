import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedJobsTableComponent } from './failed-jobs-table.component';

describe('FailedJobsTableComponent', () => {
  let component: FailedJobsTableComponent;
  let fixture: ComponentFixture<FailedJobsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailedJobsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailedJobsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
