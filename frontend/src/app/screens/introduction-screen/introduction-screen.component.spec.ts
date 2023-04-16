import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionScreenComponent } from './introduction-screen.component';

describe('IntroductionScreenComponent', () => {
  let component: IntroductionScreenComponent;
  let fixture: ComponentFixture<IntroductionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
