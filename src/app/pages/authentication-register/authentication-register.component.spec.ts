import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRegisterComponent } from './authentication-register.component';

describe('AuthenticationRegisterComponent', () => {
  let component: AuthenticationRegisterComponent;
  let fixture: ComponentFixture<AuthenticationRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
