import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteMensualModalComponent } from './corte-mensual-modal.component';

describe('CorteMensualModalComponent', () => {
  let component: CorteMensualModalComponent;
  let fixture: ComponentFixture<CorteMensualModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorteMensualModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorteMensualModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
