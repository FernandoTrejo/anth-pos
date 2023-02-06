import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteParcialModalComponent } from './corte-parcial-modal.component';

describe('CorteParcialModalComponent', () => {
  let component: CorteParcialModalComponent;
  let fixture: ComponentFixture<CorteParcialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorteParcialModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorteParcialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
