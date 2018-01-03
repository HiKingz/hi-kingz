import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePoiComponent } from './create-poi.component';

describe('CreatePoiComponent', () => {
  let component: CreatePoiComponent;
  let fixture: ComponentFixture<CreatePoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
