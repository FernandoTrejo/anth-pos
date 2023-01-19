import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagoEfectivoComponent } from './modal-pago-efectivo.component';

describe('ModalPagoEfectivoComponent', () => {
  let component: ModalPagoEfectivoComponent;
  let fixture: ComponentFixture<ModalPagoEfectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPagoEfectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPagoEfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
