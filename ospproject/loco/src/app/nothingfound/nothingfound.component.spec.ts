import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingfoundComponent } from './nothingfound.component';

describe('NothingfoundComponent', () => {
  let component: NothingfoundComponent;
  let fixture: ComponentFixture<NothingfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NothingfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NothingfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
