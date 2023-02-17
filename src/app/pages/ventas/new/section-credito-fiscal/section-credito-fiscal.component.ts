import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section-credito-fiscal',
  templateUrl: './section-credito-fiscal.component.html',
  styleUrls: ['./section-credito-fiscal.component.css']
})
export class SectionCreditoFiscalComponent {
  @Output() nombreCliente : EventEmitter<string> = new EventEmitter<string>;
  @Input() nombreInicial : string = '';
  actualizarNombreCliente(nombre : string){
    this.nombreCliente.emit(nombre);
  }
}
