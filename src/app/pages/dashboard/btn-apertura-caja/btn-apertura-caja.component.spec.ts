import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAperturaCajaComponent } from './btn-apertura-caja.component';

describe('BtnAperturaCajaComponent', () => {
  let component: BtnAperturaCajaComponent;
  let fixture: ComponentFixture<BtnAperturaCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAperturaCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAperturaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
