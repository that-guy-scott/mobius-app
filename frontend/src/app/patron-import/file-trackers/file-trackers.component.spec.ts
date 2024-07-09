import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTrackersComponent } from './file-trackers.component';

describe('FileTrackersComponent', () => {
  let component: FileTrackersComponent;
  let fixture: ComponentFixture<FileTrackersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileTrackersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileTrackersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
