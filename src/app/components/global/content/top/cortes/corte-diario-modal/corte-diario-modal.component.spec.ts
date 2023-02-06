import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteDiarioModalComponent } from './corte-diario-modal.component';

describe('CorteDiarioModalComponent', () => {
  let component: CorteDiarioModalComponent;
  let fixture: ComponentFixture<CorteDiarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorteDiarioModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorteDiarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
