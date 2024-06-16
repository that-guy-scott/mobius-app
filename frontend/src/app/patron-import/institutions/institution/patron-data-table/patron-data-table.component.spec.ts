import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronDataTableComponent } from './patron-data-table.component';

describe('PatronDataTableComponent', () => {
  let component: PatronDataTableComponent;
  let fixture: ComponentFixture<PatronDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatronDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatronDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
