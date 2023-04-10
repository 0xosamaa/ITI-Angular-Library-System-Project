import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAddingComponent } from './administrator-adding.component';

describe('AdministratorAddingComponent', () => {
  let component: AdministratorAddingComponent;
  let fixture: ComponentFixture<AdministratorAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorAddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
