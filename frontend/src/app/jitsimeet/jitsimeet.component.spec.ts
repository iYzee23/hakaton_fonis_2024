import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitsimeetComponent } from './jitsimeet.component';

describe('JitsimeetComponent', () => {
  let component: JitsimeetComponent;
  let fixture: ComponentFixture<JitsimeetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JitsimeetComponent]
    });
    fixture = TestBed.createComponent(JitsimeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
