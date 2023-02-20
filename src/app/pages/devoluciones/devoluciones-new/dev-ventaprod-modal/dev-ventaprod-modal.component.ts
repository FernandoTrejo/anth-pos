import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { FindActiveCorteDiarioService } from 'src/app/services/cortes/corte-diario/find-active-corte-diario.service';
import { FindActiveCorteMensualService } from 'src/app/services/cortes/corte-mensual/find-active-corte-mensual.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { StoreDevolucionService } from 'src/app/services/devoluciones/store-devolucion.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { FindByCodeService } from 'src/app/services/orders/find-by-code.service';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';
import { MessageType } from 'src/app/utilities/messages';
import { Money } from 'src/app/utilities/money';
import { Status } from 'src/app/utilities/status';
import { TipoDocumentos } from 'src/app/utilities/tipo_documentos';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dev-ventaprod-modal',
  templateUrl: './dev-ventaprod-modal.component.html',
  styleUrls: ['./dev-ventaprod-modal.component.css']
})
export class DevVentaprodModalComponent implements OnChanges {
  @Input() ventaCodigo = '';
  productosDevolucion: ProductoOrden[] = [];
  @ViewChild('btnCloseModal') CloseModal!: ElementRef<HTMLButtonElement>;

  ventaProductos = liveQuery(() => this.orderProductFinder.allByOrderCode(this.ventaCodigo));

  constructor(
    private orderProductFinder: FindProductsService,
    private findCorteMensual: FindActiveCorteMensualService,
    private findCorteParcial: FindActiveCorteParcialService,
    private findCorteDiario: FindActiveCorteDiarioService,
    private ventaFinder: FindByCodeService,
    private notifier: NotifyService,
    private guardarDevolucion: StoreDevolucionService,
    private router: Router) { }

  ngOnChanges(): void {
    this.ventaProductos = liveQuery(() => this.orderProductFinder.allByOrderCode(this.ventaCodigo));
    this.productosDevolucion = [];
  }

  formatMoney(quantity: number) {
    return (new Money(quantity)).toString();
  }

  async agregarProductoDevolucion(codigoProducto: string, event: any) {
    //dom
    const row = event.target.parentNode;
    const quantityField = row.children[1];
    const quantitySpan = quantityField.children[0];
    const quantityInput = quantityField.children[1];
    const subtotalField = row.children[3];
    const subtotalFirstSpan = subtotalField.children[0];
    const subtotalSecondSpan = subtotalField.children[1];

    //verificar si ya existe este codigo, y si ya existe lo que debe hacer es eliminarlo
    const productos = this.productosDevolucion.filter(producto => {
      return producto.codigo_producto == codigoProducto;
    });
    if (productos.length > 0) {
      this.productosDevolucion = this.productosDevolucion.filter(producto => {
        return producto.codigo_producto != codigoProducto;
      });

      //css cambios
      row.classList.remove('selected-product');

      quantitySpan.classList.remove('d-none');
      quantityInput.classList.add('d-none');

      subtotalFirstSpan.classList.remove('d-none');
      subtotalSecondSpan.classList.add('d-none');
      return;
    }

    //en caso de que no existe, se debe agregar
    const producto = await this.orderProductFinder.findProductInOrder(this.ventaCodigo, codigoProducto);
    if (!producto) {
      return;
    }

    this.productosDevolucion.push(producto);

    //css cambios

    row.classList.add('selected-product');

    quantitySpan.classList.add('d-none');
    quantityInput.classList.remove('d-none');

    subtotalFirstSpan.classList.add('d-none');
    subtotalSecondSpan.classList.remove('d-none');
    subtotalSecondSpan.innerText = this.formatMoney(producto.subtotal);
  }

  totalDevolucion() {
    const total = this.productosDevolucion.reduce((total: number, current: ProductoOrden) => total += Number(current.subtotal), 0);
    return (new Money(total)).toString();
  }

  calcularTotal() {
    return this.productosDevolucion.reduce((total: number, current: ProductoOrden) => total += Number(current.subtotal), 0);
  }

  actualizarCantidadDevolucion(codigoProducto: string, cantidadAnterior: number, event: any) {
    const cantidad = Number(event.target.value);
    const maximo = Number(event.target.max);
    const minimo = Number(event.target.min);

    if (cantidad > maximo || cantidad < minimo) {
      event.target.value = cantidadAnterior;
      return;
    }

    let subtotal = 0;
    this.productosDevolucion.map(producto => {
      if (producto.codigo_producto == codigoProducto) {
        subtotal = Number(producto.precio) * cantidad;
        producto.cantidad = cantidad;
        producto.subtotal = Number(subtotal);
      }
    });


    const row = event.target.parentNode.parentNode;
    const subtotalField = row.children[3];
    const subtotalSecondSpan = subtotalField.children[1];
    subtotalSecondSpan.innerText = this.formatMoney(subtotal);
  }

  async showConfirmation() {
    if (this.productosDevolucion.length == 0) {
      this.notifier.error('No ha seleccionado ningun producto para devolver');
    } else {

      Swal.fire({
        title: '¿Estas seguro de realizar esta accion?',
        text: 'Realizar devolucion',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si, realizar devolucion'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.storeDevolucion();
          this.CloseModal.nativeElement.click();
        }

      });
    }
  }


  async storeDevolucion() {

    const corteMensual = await this.findCorteMensual.find();
    const corteDiario = await this.findCorteDiario.find();
    const corteParcial = await this.findCorteParcial.find();
    const total = Number(this.calcularTotal());

    if (!corteMensual || !corteDiario || !corteParcial || Number(total) == 0) {
      this.notifier.error('Ha ocurrido un error');
      return;
    }

    const venta = await this.ventaFinder.find(this.ventaCodigo);
    if (!venta) {
      this.notifier.error('Ha ocurrido un error');
      return;
    }

    const codigoDevolucion = v4();

    const devolucion = {
      codigo: codigoDevolucion,
      numero_transaccion: '',
      fecha: new Date(),
      referencia: venta.codigo,//extraer de orden de venta
      nombre_cliente: venta.nombre_cliente,//extraer de orden de venta
      total: Number(total) * -1,
      tipo_transaccion: TipoTransacciones.Devolucion,
      status: Status.Closed,
      corte_mensual: corteMensual.codigo,
      corte_diario: corteDiario.codigo,
      corte_parcial: corteParcial.codigo,
      tipo_documento_clave: TipoDocumentos.TicketDevolucion
    }

    this.productosDevolucion.map(producto => {
      producto.id = undefined;
      producto.codigo_corte_x = corteParcial?.codigo;
      producto.codigo_orden = codigoDevolucion;
      producto.cantidad = Number(producto.cantidad) * -1,
        producto.subtotal = Number(producto.subtotal) * -1
    });

    const response = await this.guardarDevolucion.store(devolucion, this.productosDevolucion);
    this.notifier.show(response.type, response.title);
    if (response.type == MessageType.success) {
      this.router.navigate(['devoluciones']);
    }
  }
}
