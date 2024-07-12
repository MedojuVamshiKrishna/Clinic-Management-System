import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppliedPatientsComponent } from './view-applied-patients.component';

describe('ViewAppliedPatientsComponent', () => {
  let component: ViewAppliedPatientsComponent;
  let fixture: ComponentFixture<ViewAppliedPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAppliedPatientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppliedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
