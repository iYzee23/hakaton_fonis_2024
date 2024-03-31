import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsPairComponent } from './interviews-pair.component';

describe('InterviewsPairComponent', () => {
  let component: InterviewsPairComponent;
  let fixture: ComponentFixture<InterviewsPairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewsPairComponent]
    });
    fixture = TestBed.createComponent(InterviewsPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
