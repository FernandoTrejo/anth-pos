import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { liveQuery } from 'dexie';
import { BehaviorSubject, Observable } from 'rxjs';
import { AttachClientToStoreService } from 'src/app/services/clientes/attach-client-to-store.service';
import { FindAttachedClientToStoreService } from 'src/app/services/clientes/find-attached-client-to-store.service';
import { FindClientWithFiltersService } from 'src/app/services/clientes/find-client-with-filters.service';
import { StoreClientService } from 'src/app/services/clientes/store-client.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { Cliente } from 'src/app/storage/schema/clientes/clientes';
import { MessageType } from 'src/app/utilities/messages';
import { v4 } from 'uuid';

@Component({
  selector: 'app-section-credito-fiscal',
  templateUrl: './section-credito-fiscal.component.html',
  styleUrls: ['./section-credito-fiscal.component.css']
})
export class SectionCreditoFiscalComponent {
  @Input() codigoVenta: string = '';
  clientes = liveQuery(() => this.findClientes());
  attachedCliente = liveQuery(() => this.findAttached.find(this.codigoVenta));
  nombreClienteNuevo = '';
  nrcClienteNuevo = '';
  nitClienteNuevo = '';


  constructor(private storeClientService: StoreClientService,
    private findClientsService: FindClientWithFiltersService,
    private notifier: NotifyService,
    private attach: AttachClientToStoreService,
    private findAttached: FindAttachedClientToStoreService) {
      
  }

  async store() {
    if (
      this.nombreClienteNuevo.trim() == '' ||
      this.nrcClienteNuevo.trim() == '' ||
      this.nitClienteNuevo.trim() == ''
    ) {
      this.notifier.error('Debe completar todos los datos');
      return;
    }

    const codigoCliente = v4();
    const cliente: Cliente = {
      nombre_cliente: this.nombreClienteNuevo,
      nrc: this.nrcClienteNuevo,
      nit: this.nitClienteNuevo,
      codigo: codigoCliente
    };
    const response = await this.storeClientService.store(cliente);
    this.notifier.show(response.type, response.title);

    if (response.type == MessageType.success) {
      const attachResponse = await this.attach.attach(codigoCliente, this.codigoVenta);
      this.notifier.show(attachResponse.type, attachResponse.title);
    }
  }

  async findClientes() {
    return await this.findClientsService.all();
  }

  async selectNewClient(codigo: string) {
    const response = await this.attach.attach(codigo, this.codigoVenta);
    this.notifier.show(response.type, response.title);
  }


  //busqueda de clientes
  @ViewChild('tipoFiltro') tipoFiltro!: ElementRef<HTMLSelectElement>;
  filtros = {};
  existeFiltro = false;
  noExisteFiltro = true;
  clientesFiltros: BehaviorSubject<Cliente[]> = new BehaviorSubject<Cliente[]>([]);
  

  async filtrarClientes(event: any) {
    let texto = event.target.value;
    if (texto.trim() == '') {
      this.existeFiltro = false;
      this.noExisteFiltro = true;
      return;
    }

    this.existeFiltro = true;
    this.noExisteFiltro = false;
    let tipoFiltro = this.tipoFiltro.nativeElement.value;

    switch (tipoFiltro) {
      case 'nombre_cliente':
        this.clientesFiltros.next(await this.findClientsService.findByName(texto));
        return;
      case 'nit':
        this.filtros = {
          nit: texto
        }
        break;
      case 'nrc':
        this.filtros = {
          nrc: texto
        }
        break;
    }

    const newClients = await this.findClientsService.find(this.filtros, 2);
    this.clientesFiltros.next(newClients);
  }
}
