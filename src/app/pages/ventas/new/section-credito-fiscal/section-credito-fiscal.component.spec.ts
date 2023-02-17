import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCreditoFiscalComponent } from './section-credito-fiscal.component';

describe('SectionCreditoFiscalComponent', () => {
  let component: SectionCreditoFiscalComponent;
  let fixture: ComponentFixture<SectionCreditoFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCreditoFiscalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCreditoFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
