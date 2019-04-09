import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostnewsComponent } from './postnews.component';

describe('PostnewsComponent', () => {
  let component: PostnewsComponent;
  let fixture: ComponentFixture<PostnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
