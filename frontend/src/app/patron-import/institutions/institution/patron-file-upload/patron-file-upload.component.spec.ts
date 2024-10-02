import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronFileUploadComponent } from './patron-file-upload.component';

describe('PatronFileUploadComponent', () => {
  let component: PatronFileUploadComponent;
  let fixture: ComponentFixture<PatronFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatronFileUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatronFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
