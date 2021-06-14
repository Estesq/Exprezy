import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingserviceComponent } from './ongoingservice.component';

describe('OngoingserviceComponent', () => {
  let component: OngoingserviceComponent;
  let fixture: ComponentFixture<OngoingserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
