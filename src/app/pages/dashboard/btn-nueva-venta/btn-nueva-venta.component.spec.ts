import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNuevaVentaComponent } from './btn-nueva-venta.component';

describe('BtnNuevaVentaComponent', () => {
  let component: BtnNuevaVentaComponent;
  let fixture: ComponentFixture<BtnNuevaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnNuevaVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnNuevaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
