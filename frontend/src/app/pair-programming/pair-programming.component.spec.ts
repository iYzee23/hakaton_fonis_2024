import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairProgrammingComponent } from './pair-programming.component';

describe('PairProgrammingComponent', () => {
  let component: PairProgrammingComponent;
  let fixture: ComponentFixture<PairProgrammingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PairProgrammingComponent]
    });
    fixture = TestBed.createComponent(PairProgrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
