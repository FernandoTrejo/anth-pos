import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTransaccionesComponent } from './section-transacciones.component';

describe('SectionTransaccionesComponent', () => {
  let component: SectionTransaccionesComponent;
  let fixture: ComponentFixture<SectionTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTransaccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
