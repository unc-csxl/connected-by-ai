import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedImageSlideComponent } from './generated-image-slide.component';

describe('GeneratedImageSlideComponent', () => {
  let component: GeneratedImageSlideComponent;
  let fixture: ComponentFixture<GeneratedImageSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedImageSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedImageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
