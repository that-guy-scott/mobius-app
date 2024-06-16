import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronLoadChartComponent } from './patron-load-chart.component';

describe('PatronLoadChartComponent', () => {
  let component: PatronLoadChartComponent;
  let fixture: ComponentFixture<PatronLoadChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatronLoadChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatronLoadChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
