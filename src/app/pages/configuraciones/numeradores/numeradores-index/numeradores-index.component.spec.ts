import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeradoresIndexComponent } from './numeradores-index.component';

describe('NumeradoresIndexComponent', () => {
  let component: NumeradoresIndexComponent;
  let fixture: ComponentFixture<NumeradoresIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeradoresIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumeradoresIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
