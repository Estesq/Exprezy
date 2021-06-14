import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedjobComponent } from './acceptedjob.component';

describe('AcceptedjobComponent', () => {
  let component: AcceptedjobComponent;
  let fixture: ComponentFixture<AcceptedjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
