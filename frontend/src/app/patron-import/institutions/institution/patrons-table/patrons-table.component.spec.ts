import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronsTableComponent } from './patrons-table.component';

describe('PatronsTableComponent', () => {
  let component: PatronsTableComponent;
  let fixture: ComponentFixture<PatronsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatronsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatronsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
