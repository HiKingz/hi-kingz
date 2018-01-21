import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiUIComponent } from './poi-ui.component';

describe('PoiUIComponent', () => {
  let component: PoiUIComponent;
  let fixture: ComponentFixture<PoiUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
