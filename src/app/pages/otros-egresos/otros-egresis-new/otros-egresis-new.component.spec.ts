import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosEgresisNewComponent } from './otros-egresis-new.component';

describe('OtrosEgresisNewComponent', () => {
  let component: OtrosEgresisNewComponent;
  let fixture: ComponentFixture<OtrosEgresisNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrosEgresisNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrosEgresisNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
