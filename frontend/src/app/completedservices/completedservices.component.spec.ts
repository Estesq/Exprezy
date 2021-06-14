import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedservicesComponent } from './completedservices.component';

describe('CompletedservicesComponent', () => {
  let component: CompletedservicesComponent;
  let fixture: ComponentFixture<CompletedservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
