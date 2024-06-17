import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtypePatronGroupsComponent } from './ptype-patron-groups.component';

describe('PtypePatronGroupsComponent', () => {
  let component: PtypePatronGroupsComponent;
  let fixture: ComponentFixture<PtypePatronGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PtypePatronGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PtypePatronGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
