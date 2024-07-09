import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTrackerComponent } from './file-tracker.component';

describe('FileTrackerComponent', () => {
  let component: FileTrackerComponent;
  let fixture: ComponentFixture<FileTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
