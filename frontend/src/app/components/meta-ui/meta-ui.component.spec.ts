import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaUiComponent } from './meta-ui.component';

describe('MetaUiComponent', () => {
  let component: MetaUiComponent;
  let fixture: ComponentFixture<MetaUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
