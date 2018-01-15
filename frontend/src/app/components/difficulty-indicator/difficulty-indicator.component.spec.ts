import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyIndicatorComponent } from './difficulty-indicator.component';

describe('DifficultyIndicatorComponent', () => {
  let component: DifficultyIndicatorComponent;
  let fixture: ComponentFixture<DifficultyIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifficultyIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
