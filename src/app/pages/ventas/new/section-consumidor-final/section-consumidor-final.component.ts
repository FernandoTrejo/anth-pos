import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section-consumidor-final',
  templateUrl: './section-consumidor-final.component.html',
  styleUrls: ['./section-consumidor-final.component.css']
})
export class SectionConsumidorFinalComponent {
  @Output() nombreCliente : EventEmitter<string> = new EventEmitter<string>;
  @Input() nombreInicial : string = '';
  actualizarNombreCliente(nombre : string){
    this.nombreCliente.emit(nombre);
  }
}
