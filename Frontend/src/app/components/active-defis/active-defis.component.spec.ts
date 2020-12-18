import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDefisComponent } from './active-defis.component';

describe('ActiveDefisComponent', () => {
  let component: ActiveDefisComponent;
  let fixture: ComponentFixture<ActiveDefisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveDefisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveDefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
