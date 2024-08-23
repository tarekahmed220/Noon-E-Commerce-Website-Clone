import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWithSliderComponent } from './section-with-slider.component';

describe('SectionWithSliderComponent', () => {
  let component: SectionWithSliderComponent;
  let fixture: ComponentFixture<SectionWithSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionWithSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionWithSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
