import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNewsComponent } from './search-news.component';

describe('SearchNewsComponent', () => {
  let component: SearchNewsComponent;
  let fixture: ComponentFixture<SearchNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
