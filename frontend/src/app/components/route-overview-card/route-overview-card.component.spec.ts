import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteOverviewCardComponent } from './route-overview-card.component';

describe('RouteOverviewCardComponent', () => {
  let component: RouteOverviewCardComponent;
  let fixture: ComponentFixture<RouteOverviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteOverviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
