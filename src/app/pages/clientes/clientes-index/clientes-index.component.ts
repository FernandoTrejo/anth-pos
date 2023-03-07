import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindClientWithFiltersService } from 'src/app/services/clientes/find-client-with-filters.service';

import { PaginationInstance } from 'ngx-pagination/public-api';

@Component({
  selector: 'app-clientes-index',
  templateUrl: './clientes-index.component.html',
  styleUrls: ['./clientes-index.component.css']
})
export class ClientesIndexComponent {
  clientes = liveQuery(() => this.clientFinder.allCombined());

  searchText : string = '';
  filterType : string = 'nombre_cliente';

  public filter: string = '';
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 20,
    currentPage: 1
};
  p: number = 1;
  constructor(private clientFinder: FindClientWithFiltersService) { }


  changePage(page : number){
    this.config.currentPage = page;
  }

}
