import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyInidicatorComponent } from './difficulty-inidicator.component';

describe('DifficultyInidicatorComponent', () => {
  let component: DifficultyInidicatorComponent;
  let fixture: ComponentFixture<DifficultyInidicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifficultyInidicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyInidicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
