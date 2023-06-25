import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayBackToTopButtomFooterComponent } from './overlay-back-to-top-buttom-footer.component';

describe('OverlayBackToTopButtomFooterComponent', () => {
  let component: OverlayBackToTopButtomFooterComponent;
  let fixture: ComponentFixture<OverlayBackToTopButtomFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayBackToTopButtomFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayBackToTopButtomFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
