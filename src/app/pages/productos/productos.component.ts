import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { liveQuery } from 'dexie';
import { PaginationInstance } from 'ngx-pagination/public-api';
import { FindProductsService } from 'src/app/services/products/find-products.service';
import { Money } from 'src/app/utilities/money';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos = liveQuery(() => this.productFinder.all());

  searchText : string = '';
  filterType : string = 'nombre';

  public filter: string = '';
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 20,
    currentPage: 1
};
  p: number = 1;
  constructor(private productFinder: FindProductsService) { }

  formatMoney(quantity: number) {
    return (new Money(quantity)).toString();
  }

  changePage(page : number){
    this.config.currentPage = page;
  }


}
