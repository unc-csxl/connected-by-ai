import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratingArtComponent } from './generating-art.component';

describe('GeneratingArtComponent', () => {
  let component: GeneratingArtComponent;
  let fixture: ComponentFixture<GeneratingArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratingArtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratingArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
