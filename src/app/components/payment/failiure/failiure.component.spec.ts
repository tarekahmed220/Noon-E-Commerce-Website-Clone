import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailiureComponent } from './failiure.component';

describe('FailiureComponent', () => {
  let component: FailiureComponent;
  let fixture: ComponentFixture<FailiureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailiureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailiureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
