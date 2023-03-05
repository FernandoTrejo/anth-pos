import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from 'src/app/utilities/status';

@Component({
  selector: 'app-section-ticket',
  templateUrl: './section-ticket.component.html',
  styleUrls: ['./section-ticket.component.css']
})
export class SectionTicketComponent {
  statusAbierto = Status.Open;
  statusCerrado = Status.Closed;
  statusAnulado = Status.Nulled;

  @Output() nombreCliente : EventEmitter<string> = new EventEmitter<string>;
  @Input() nombreInicial : string = '';
  @Input() statusTransaccion = Status.Open.toString();
  actualizarNombreCliente(nombre : string){
    this.nombreCliente.emit(nombre);
  }
}
