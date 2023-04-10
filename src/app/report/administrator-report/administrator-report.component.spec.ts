import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorReportComponent } from './administrator-report.component';

describe('AdministratorReportComponent', () => {
  let component: AdministratorReportComponent;
  let fixture: ComponentFixture<AdministratorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
