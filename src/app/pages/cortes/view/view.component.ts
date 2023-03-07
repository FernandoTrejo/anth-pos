import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindCortesDetailsService } from 'src/app/services/cortes/find-cortes-details.service';
import { FindTransactionsByCorteService } from 'src/app/services/orders/find-transactions-by-corte.service';
import { FindTotalByTypeService } from 'src/app/services/payments/find-total-by-type.service';
import { formatDateTime } from 'src/app/utilities/date';
import { Money } from 'src/app/utilities/money';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  //breadcrumb
  breadcrumbItems: Array<BreadcrumbItem> = [
    {
      title: 'Cortes',
      link: '/cortes'
    },
    {
      title: 'Ver',
      link: ''
    }
  ];

  codigoCorte : string = '';
  private sub : any;
  details = liveQuery(() => this.detailsFinder.details(this.codigoCorte));
  transactions = liveQuery(() => this.orderFinder.getByCorteParcial(this.codigoCorte));
  constructor(
    private detailsFinder : FindCortesDetailsService,
    private route: ActivatedRoute,
    private orderFinder : FindTransactionsByCorteService,
    private totalCalculatorX : FindTotalByTypeService){}

  async ngOnInit(){
    this.sub = this.route.params.subscribe(async (params: { [x: string]: string; }) => {
      this.codigoCorte = params['codigo_corte'];

      console.log(await this.totalCalculatorX.calculateX('efectivo', this.codigoCorte));
    });
  }

  formatMoney(quantity: number){
    return (new Money(quantity)).toString();
  }

  formatFecha(date : Date){
    return formatDateTime(date);
  }

  async calculateByType(type : string){
    return await this.totalCalculatorX.calculateX(type, this.codigoCorte);
  }
}
