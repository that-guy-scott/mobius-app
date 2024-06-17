import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedPatronDataTableComponent } from './failed-patron-data-table.component';

describe('FailedPatronDataTableComponent', () => {
  let component: FailedPatronDataTableComponent;
  let fixture: ComponentFixture<FailedPatronDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailedPatronDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailedPatronDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
