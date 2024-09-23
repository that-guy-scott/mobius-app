import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronFileDropzoneComponent } from './patron-file-dropzone.component';

describe('PatronFileDropzoneComponent', () => {
  let component: PatronFileDropzoneComponent;
  let fixture: ComponentFixture<PatronFileDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatronFileDropzoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatronFileDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
