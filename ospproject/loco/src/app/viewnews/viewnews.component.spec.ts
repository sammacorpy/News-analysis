import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnewsComponent } from './viewnews.component';

describe('ViewnewsComponent', () => {
  let component: ViewnewsComponent;
  let fixture: ComponentFixture<ViewnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
