import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindCortesDetailsService } from 'src/app/services/cortes/find-cortes-details.service';
import { FindTransactionsByCorteService } from 'src/app/services/orders/find-transactions-by-corte.service';
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
    private orderFinder : FindTransactionsByCorteService){}

  async ngOnInit(){
    this.sub = this.route.params.subscribe((params: { [x: string]: string; }) => {
      this.codigoCorte = params['codigo_corte'];
    });
  }

  formatMoney(quantity: number){
    return (new Money(quantity)).toString();
  }

  formatFecha(date : Date){
    return formatDateTime(date);
  }
}
