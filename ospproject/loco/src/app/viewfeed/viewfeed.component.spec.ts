import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfeedComponent } from './viewfeed.component';

describe('ViewfeedComponent', () => {
  let component: ViewfeedComponent;
  let fixture: ComponentFixture<ViewfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
