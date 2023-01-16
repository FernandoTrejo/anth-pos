import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProductosAgregadosComponent } from './tabla-productos-agregados.component';

describe('TablaProductosAgregadosComponent', () => {
  let component: TablaProductosAgregadosComponent;
  let fixture: ComponentFixture<TablaProductosAgregadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaProductosAgregadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaProductosAgregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
