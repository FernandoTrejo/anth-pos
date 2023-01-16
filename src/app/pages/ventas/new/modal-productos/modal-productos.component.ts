import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindCategoriesService } from 'src/app/services/categories/find-categories.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent {
  categoriesWithProducts = liveQuery(() => this.getCategoriesWithProducts());

  constructor(private categoryFinder : FindCategoriesService){
  }


  async getCategoriesWithProducts(){
    return await this.categoryFinder.allWithProducts();
  }
}
