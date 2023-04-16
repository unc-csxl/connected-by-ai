import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePersonMessageComponent } from './one-person-message.component';

describe('OnePersonMessageComponent', () => {
  let component: OnePersonMessageComponent;
  let fixture: ComponentFixture<OnePersonMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePersonMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnePersonMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
