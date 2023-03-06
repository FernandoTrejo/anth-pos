import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FindActiveCorteDiarioService } from 'src/app/services/cortes/corte-diario/find-active-corte-diario.service';
import { FindActiveCorteMensualService } from 'src/app/services/cortes/corte-mensual/find-active-corte-mensual.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { NextNumService } from 'src/app/services/numeradores/next-num.service';
import { StoreOrderService } from 'src/app/services/orders/store-order.service';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';
import { Status } from 'src/app/utilities/status';
import { TipoDocumentos } from 'src/app/utilities/tipo_documentos';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';

@Component({
  selector: 'app-otros-egresos-new',
  templateUrl: './otros-egresis-new.component.html',
  styleUrls: ['./otros-egresis-new.component.css']
})
export class OtrosEgresisNewComponent {
  @ViewChild('btnCloseModal') CloseModal!: ElementRef<HTMLButtonElement>;

  cantidadEfectivo = 0;
  nombreCliente = '';
  descripcionTransaccion = '';
  referenciaTransaccion = '';
  documentoSeleccionado = '';
  tipoTransaccion = TipoTransacciones.OtrosEgresos;

  constructor(private storeOrder: StoreOrderService,
    private router: Router,
    private findCorteMensual: FindActiveCorteMensualService,
    private findCorteParcial: FindActiveCorteParcialService,
    private findCorteDiario: FindActiveCorteDiarioService,
    private notifier: NotifyService,
    private nextNumService : NextNumService) { }

  async showConfirmation() {
    Swal.fire({
      title: '¿Desea guardar la transaccion?',
      text: 'Finalizar',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.store();
        this.CloseModal.nativeElement.click();
      }

    });
  }

  async store() {
    const corteMensual = await this.findCorteMensual.find();
    const corteDiario = await this.findCorteDiario.find();
    const corteParcial = await this.findCorteParcial.find();

    if (!corteMensual || !corteDiario || !corteParcial) {
      this.notifier.error('Ha ocurrido un error inesperado'); return;
    }

    if (!(await this.nextNumService.validateNext(TipoDocumentos.TicketOtrosEgresos))) {
      this.notifier.error('No hay correlativos'); return;
    }

    if (!this.totalIsGreaterThanZero(Number(this.cantidadEfectivo))) {
      this.notifier.error('El total no puede ser $0.00'); return;
    }


    const codigo = v4();
    const nextNum = await this.nextNumService.next(TipoDocumentos.TicketOtrosEgresos);
    let transaccion: Transacciones = {
      codigo: codigo,
      numero_transaccion: nextNum,
      fecha: new Date,
      referencia: this.referenciaTransaccion,
      nombre_cliente: this.nombreCliente,
      total: Number(this.cantidadEfectivo),
      tipo_transaccion: this.tipoTransaccion,
      status: Status.Closed,
      corte_diario: corteDiario.codigo,
      corte_parcial: corteParcial.codigo,
      corte_mensual: corteMensual.codigo,
      tipo_documento_clave: this.documentoSeleccionado,
      descripcion: this.descripcionTransaccion
    };
    await this.storeOrder.process(transaccion);
    
    this.notifier.success('La transaccion se ha guardado exitosamente');
    await this.nextNumService.updateActual(TipoDocumentos.TicketOtrosEgresos);
    this.router.navigate(['/otros-egresos']);
  }

  totalIsGreaterThanZero(total: number): boolean {
    return Number(total) > 0;
  }
}
