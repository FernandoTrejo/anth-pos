import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section-ticket',
  templateUrl: './section-ticket.component.html',
  styleUrls: ['./section-ticket.component.css']
})
export class SectionTicketComponent {
  @Output() nombreCliente : EventEmitter<string> = new EventEmitter<string>;
  @Input() nombreInicial : string = '';
  actualizarNombreCliente(nombre : string){
    this.nombreCliente.emit(nombre);
  }
}
