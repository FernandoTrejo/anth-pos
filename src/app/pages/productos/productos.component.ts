import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindProductsService } from 'src/app/services/products/find-products.service';
import { Money } from 'src/app/utilities/money';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos = liveQuery(() => this.productFinder.all());
  constructor(private productFinder : FindProductsService){}

  formatMoney(quantity : number){
    return (new Money(quantity)).toString();
  }
}
