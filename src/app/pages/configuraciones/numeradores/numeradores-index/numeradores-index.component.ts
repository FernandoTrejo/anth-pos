import { Component, ElementRef, ViewChild } from '@angular/core';
import { liveQuery } from 'dexie';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { FindNumeradoresService } from 'src/app/services/numeradores/find-numeradores.service';
import { StoreChangesService } from 'src/app/services/numeradores/store-changes.service';
import { TraducirTipoDocumento } from 'src/app/utilities/tipo_documentos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-numeradores-index',
  templateUrl: './numeradores-index.component.html',
  styleUrls: ['./numeradores-index.component.css']
})
export class NumeradoresIndexComponent {

  constructor(
    private findNumeradoresService: FindNumeradoresService,
    private notifier: NotifyService,
    private storeChangesService: StoreChangesService
  ) { }
  numeradores = liveQuery(() => this.findNumeradoresService.all());

  traducirTipoDoc(tipodoc: string) {
    return TraducirTipoDocumento(tipodoc);
  }

  loadingNumeradorInfo = true;
  numeracionEdicion = '';
  prefijoEdicion = '';
  inicio = 0;
  fin = 0;
  nombreNumerador = '';
  idEdicion = 0;

  @ViewChild('btnCloseModal') CloseModal!: ElementRef<HTMLButtonElement>;

  async showNumeradorInfo(tipoDoc: string) {
    this.loadingNumeradorInfo = true;
    const numerador = await this.findNumeradoresService.findByTipoDoc(tipoDoc);
    this.loadingNumeradorInfo = false;

    if (numerador != undefined) {
      this.numeracionEdicion = numerador.numeracion;
      this.prefijoEdicion = numerador.prefijo;
      this.inicio = numerador.inicio;
      this.fin = numerador.fin;
      this.nombreNumerador = numerador.nombre;
      this.idEdicion = (numerador.id) ? numerador.id : 0;
    }

  }

  resetVariables() {
    this.loadingNumeradorInfo = true;
    this.numeracionEdicion = '';
    this.prefijoEdicion = '';
    this.inicio = 0;
    this.fin = 0;
    this.nombreNumerador = '';
    this.idEdicion = 0;
  }

  async showConfirmation() {
    Swal.fire({
      title: '¿Desea guardar los cambios?',
      text: 'Guardar cambios',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.storeChanges();
        this.CloseModal.nativeElement.click();
      }

    });
  }

  async storeChanges() {
    if (!this.validateChanges(this.numeracionEdicion, this.inicio, this.fin)) {
      return;
    }

    const cambios = {
      numeracion: this.numeracionEdicion,
      prefijo: this.prefijoEdicion,
      inicio: this.inicio,
      fin: this.fin,
      actual: this.inicio
    };

    const response = await this.storeChangesService.store(this.idEdicion, cambios);
    this.notifier.show(response.type, response.title);

    this.resetVariables();

  }

  validateChanges(numeracion: string, inicio: number, fin: number) {
    if (numeracion.trim() == '') {
      this.notifier.error('La numeracion no puede estar vacia');
      return false;
    }

    if (inicio >= fin) {
      this.notifier.error('El correlativo de inicio no puede ser igual o mayor al correlativo fin');
      return false;
    }

    return true;
  }
}
