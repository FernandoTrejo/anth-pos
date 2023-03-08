import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindCortesDetailsService } from 'src/app/services/cortes/find-cortes-details.service';
import { FindTransactionsByCorteService } from 'src/app/services/orders/find-transactions-by-corte.service';
import { FindTotalByTypeService } from 'src/app/services/payments/find-total-by-type.service';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';
import { formatDateTime } from 'src/app/utilities/date';
import { Money } from 'src/app/utilities/money';
import { Status } from 'src/app/utilities/status';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';

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

  
  totalVentas = 0;
  totalDevoluciones = 0;
  totalIngresos = 0;
  totalEgresos = 0;

  totalGeneral = 0;

  async ngOnInit(){
    this.sub = this.route.params.subscribe(async (params: { [x: string]: string; }) => {
      this.codigoCorte = params['codigo_corte'];

      console.log(await this.totalCalculatorX.calculateX('efectivo', this.codigoCorte));

      const transacciones = await this.orderFinder.getByCorteParcial(this.codigoCorte);
      //ventas
      this.totalVentas = (transacciones.filter(transaccion => transaccion.status == Status.Closed && transaccion.tipo_transaccion == TipoTransacciones.Venta)).reduce((suma : number, actual : Transacciones) => suma + Number(actual.total), 0);
      this.totalDevoluciones = (transacciones.filter(transaccion => transaccion.status == Status.Closed && transaccion.tipo_transaccion == TipoTransacciones.Devolucion)).reduce((suma : number, actual : Transacciones) => suma + Number(actual.total), 0);
      this.totalIngresos = (transacciones.filter(transaccion => transaccion.status == Status.Closed && transaccion.tipo_transaccion == TipoTransacciones.OtrosIngresos)).reduce((suma : number, actual : Transacciones) => suma + Number(actual.total), 0);
      this.totalEgresos = (transacciones.filter(transaccion => transaccion.status == Status.Closed && transaccion.tipo_transaccion == TipoTransacciones.OtrosEgresos)).reduce((suma : number, actual : Transacciones) => suma + Number(actual.total), 0);

      this.totalGeneral = this.totalVentas + this.totalDevoluciones + this.totalIngresos + this.totalEgresos;
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
