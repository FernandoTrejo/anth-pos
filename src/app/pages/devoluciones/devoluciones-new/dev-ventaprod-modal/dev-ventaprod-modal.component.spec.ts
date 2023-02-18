import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevVentaprodModalComponent } from './dev-ventaprod-modal.component';

describe('DevVentaprodModalComponent', () => {
  let component: DevVentaprodModalComponent;
  let fixture: ComponentFixture<DevVentaprodModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevVentaprodModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevVentaprodModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
