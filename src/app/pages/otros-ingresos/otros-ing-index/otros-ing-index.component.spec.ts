import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosIngIndexComponent } from './otros-ing-index.component';

describe('OtrosIngIndexComponent', () => {
  let component: OtrosIngIndexComponent;
  let fixture: ComponentFixture<OtrosIngIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrosIngIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrosIngIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
