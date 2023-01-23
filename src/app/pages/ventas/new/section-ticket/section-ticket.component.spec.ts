import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTicketComponent } from './section-ticket.component';

describe('SectionTicketComponent', () => {
  let component: SectionTicketComponent;
  let fixture: ComponentFixture<SectionTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
