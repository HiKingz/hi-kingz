import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUIComponent } from './map-ui.component';

describe('MapUIComponent', () => {
  let component: MapUIComponent;
  let fixture: ComponentFixture<MapUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
