import { Component } from '@angular/core';
import { FindCategoryWithProductsService } from 'src/app/services/product-categories/find-category-with-products.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent {
  categoriesWithProducts = this.getCategoriesWithProducts();
  constructor(private categoryFinder : FindCategoryWithProductsService){
  }

  getCategoriesWithProducts(){
    return this.categoryFinder.all();
  }
}
