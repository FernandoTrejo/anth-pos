import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrdenPagosComponent } from './tabla-orden-pagos.component';

describe('TablaOrdenPagosComponent', () => {
  let component: TablaOrdenPagosComponent;
  let fixture: ComponentFixture<TablaOrdenPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaOrdenPagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaOrdenPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
