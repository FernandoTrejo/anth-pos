import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResumenVentasComponent } from './card-resumen-ventas.component';

describe('CardResumenVentasComponent', () => {
  let component: CardResumenVentasComponent;
  let fixture: ComponentFixture<CardResumenVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardResumenVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResumenVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
