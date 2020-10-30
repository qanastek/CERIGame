import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsQuizzComponent } from './results-quizz.component';

describe('ResultsQuizzComponent', () => {
  let component: ResultsQuizzComponent;
  let fixture: ComponentFixture<ResultsQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
