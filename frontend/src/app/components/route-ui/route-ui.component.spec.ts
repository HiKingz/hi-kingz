import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteUIComponent } from './route-ui.component';

describe('RouteUIComponent', () => {
  let component: RouteUIComponent;
  let fixture: ComponentFixture<RouteUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
