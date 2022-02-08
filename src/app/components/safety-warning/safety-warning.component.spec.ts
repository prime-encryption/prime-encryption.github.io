import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyWarningComponent } from './safety-warning.component';

describe('SafetyWarningComponent', () => {
  let component: SafetyWarningComponent;
  let fixture: ComponentFixture<SafetyWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
