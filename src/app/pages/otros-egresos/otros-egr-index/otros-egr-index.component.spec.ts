import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosEgrIndexComponent } from './otros-egr-index.component';

describe('OtrosEgrIndexComponent', () => {
  let component: OtrosEgrIndexComponent;
  let fixture: ComponentFixture<OtrosEgrIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrosEgrIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrosEgrIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
