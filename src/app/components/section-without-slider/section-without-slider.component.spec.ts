import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWithoutSliderComponent } from './section-without-slider.component';

describe('SectionWithoutSliderComponent', () => {
  let component: SectionWithoutSliderComponent;
  let fixture: ComponentFixture<SectionWithoutSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionWithoutSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionWithoutSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
