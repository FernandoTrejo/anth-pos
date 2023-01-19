import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaResumenPagosComponent } from './tabla-resumen-pagos.component';

describe('TablaResumenPagosComponent', () => {
  let component: TablaResumenPagosComponent;
  let fixture: ComponentFixture<TablaResumenPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaResumenPagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaResumenPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
