import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionesIndexComponent } from './devoluciones-index.component';

describe('DevolucionesIndexComponent', () => {
  let component: DevolucionesIndexComponent;
  let fixture: ComponentFixture<DevolucionesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionesIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
