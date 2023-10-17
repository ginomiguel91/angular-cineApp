import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardSimpleComponent } from './movie-card-simple.component';

describe('MovieCardSimpleComponent', () => {
  let component: MovieCardSimpleComponent;
  let fixture: ComponentFixture<MovieCardSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardSimpleComponent]
    });
    fixture = TestBed.createComponent(MovieCardSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
