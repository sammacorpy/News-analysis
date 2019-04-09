import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicknavComponent } from './quicknav.component';

describe('QuicknavComponent', () => {
  let component: QuicknavComponent;
  let fixture: ComponentFixture<QuicknavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicknavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicknavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
