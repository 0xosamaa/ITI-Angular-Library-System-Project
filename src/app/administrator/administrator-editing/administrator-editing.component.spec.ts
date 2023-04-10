import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorEditingComponent } from './administrator-editing.component';

describe('AdministratorEditingComponent', () => {
  let component: AdministratorEditingComponent;
  let fixture: ComponentFixture<AdministratorEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorEditingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
