import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { Money } from 'src/app/utilities/money';
@Component({
  selector: 'app-dev-ventaprod-modal',
  templateUrl: './dev-ventaprod-modal.component.html',
  styleUrls: ['./dev-ventaprod-modal.component.css']
})
export class DevVentaprodModalComponent implements OnChanges{
  @Input() ventaCodigo = '';
  productosDevolucion : string[] = [];

  ventaProductos = liveQuery(() => this.orderProductFinder.allByOrderCode(this.ventaCodigo));
  
  constructor(
    private orderProductFinder : FindProductsService){}

  ngOnChanges(): void {
    this.ventaProductos = liveQuery(() => this.orderProductFinder.allByOrderCode(this.ventaCodigo));
    this.productosDevolucion = [];
  }

  formatMoney(quantity : number){
    return (new Money(quantity)).toString();
  }

  async agregarProductoDevolucion(id : number | undefined){
    this.productosDevolucion.push('1');
  }
}
