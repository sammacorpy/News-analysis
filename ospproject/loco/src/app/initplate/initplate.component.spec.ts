import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitplateComponent } from './initplate.component';

describe('InitplateComponent', () => {
  let component: InitplateComponent;
  let fixture: ComponentFixture<InitplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
