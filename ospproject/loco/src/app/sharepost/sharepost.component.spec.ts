import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharepostComponent } from './sharepost.component';

describe('SharepostComponent', () => {
  let component: SharepostComponent;
  let fixture: ComponentFixture<SharepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
