import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionConsumidorFinalComponent } from './section-consumidor-final.component';

describe('SectionConsumidorFinalComponent', () => {
  let component: SectionConsumidorFinalComponent;
  let fixture: ComponentFixture<SectionConsumidorFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionConsumidorFinalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionConsumidorFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
