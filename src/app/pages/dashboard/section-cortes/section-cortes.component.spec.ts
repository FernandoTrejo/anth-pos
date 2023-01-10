import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCortesComponent } from './section-cortes.component';

describe('SectionCortesComponent', () => {
  let component: SectionCortesComponent;
  let fixture: ComponentFixture<SectionCortesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCortesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCortesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
