import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePatternsComponent } from './file-patterns.component';

describe('FilePatternsComponent', () => {
  let component: FilePatternsComponent;
  let fixture: ComponentFixture<FilePatternsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilePatternsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePatternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
