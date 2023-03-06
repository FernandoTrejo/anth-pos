import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { SidebarComponent } from './components/global/sidebar/sidebar.component';
import { ContentComponent } from './components/global/content/content.component';
import { AvatarComponent } from './components/global/content/top/avatar/avatar.component';
import { NotificationsComponent } from './components/global/content/top/notifications/notifications.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { InfoComponent } from './components/global/content/top/info/info.component';
import { BtnNuevaVentaComponent } from './pages/dashboard/btn-nueva-venta/btn-nueva-venta.component';
import { CardResumenVentasComponent } from './pages/dashboard/card-resumen-ventas/card-resumen-ventas.component';
import { SectionTransaccionesComponent } from './pages/dashboard/section-transacciones/section-transacciones.component';
import { SectionCortesComponent } from './pages/dashboard/section-cortes/section-cortes.component';
import { IndexComponent } from './pages/ventas/index/index.component';
import { NewComponent } from './pages/ventas/new/new.component';
import { ModalProductosComponent } from './pages/ventas/new/modal-productos/modal-productos.component';
import { ModalInventarioComponent } from './pages/ventas/new/modal-inventario/modal-inventario.component';
import { TablaProductosAgregadosComponent } from './pages/ventas/new/tabla-productos-agregados/tabla-productos-agregados.component';
import { BreadcrumbComponent } from './components/global/breadcrumb/breadcrumb.component';
import { TablaResumenPagosComponent } from './pages/ventas/new/tabla-resumen-pagos/tabla-resumen-pagos.component';
import { TablaOrdenPagosComponent } from './pages/ventas/new/tabla-orden-pagos/tabla-orden-pagos.component';
import { ModalPagoEfectivoComponent } from './pages/ventas/new/modal-pago-efectivo/modal-pago-efectivo.component';
import { SectionTicketComponent } from './pages/ventas/new/section-ticket/section-ticket.component';
import { ViewComponent } from './pages/ventas/view/view.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ModalPagoTarjetaComponent } from './pages/ventas/new/modal-pago-tarjeta/modal-pago-tarjeta.component';
import { CortesComponent } from './components/global/content/top/cortes/cortes.component';
import { CorteParcialModalComponent } from './components/global/content/top/cortes/corte-parcial-modal/corte-parcial-modal.component';
import { CorteDiarioModalComponent } from './components/global/content/top/cortes/corte-diario-modal/corte-diario-modal.component';
import { CorteMensualModalComponent } from './components/global/content/top/cortes/corte-mensual-modal/corte-mensual-modal.component';
import { BtnAperturaCajaComponent } from './pages/dashboard/btn-apertura-caja/btn-apertura-caja.component';
import { IndexComponent as SesionesIndex } from './pages/sesiones/index/index.component';
import { IndexComponent as CortesIndex } from './pages/cortes/index/index.component';
import { ViewComponent as CortesView } from './pages/cortes/view/view.component';
import { SectionConsumidorFinalComponent } from './pages/ventas/new/section-consumidor-final/section-consumidor-final.component';
import { SectionCreditoFiscalComponent } from './pages/ventas/new/section-credito-fiscal/section-credito-fiscal.component';
import { DevolucionesIndexComponent } from './pages/devoluciones/devoluciones-index/devoluciones-index.component';
import { DevolucionesNewComponent } from './pages/devoluciones/devoluciones-new/devoluciones-new.component';
import { DevVentaprodModalComponent } from './pages/devoluciones/devoluciones-new/dev-ventaprod-modal/dev-ventaprod-modal.component';
import { ConfigIndexComponent } from './pages/configuraciones/config-index/config-index.component';
import { NumeradoresIndexComponent } from './pages/configuraciones/numeradores/numeradores-index/numeradores-index.component';
import { OtrosIngIndexComponent } from './pages/otros-ingresos/otros-ing-index/otros-ing-index.component';
import { OtrosEgrIndexComponent } from './pages/otros-egresos/otros-egr-index/otros-egr-index.component';
import { NewComponent as OtrosIngresosNewComponent } from './pages/otros-ingresos/otros-ing-index/new/new.component';
import { OtrosEgresisNewComponent } from './pages/otros-egresos/otros-egresis-new/otros-egresis-new.component';
import { ImportarProductosComponent } from './pages/configuraciones/productos/importar-productos/importar-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    AvatarComponent,
    NotificationsComponent,
    DashboardComponent,
    ProductosComponent,
    InfoComponent,
    BtnNuevaVentaComponent,
    CardResumenVentasComponent,
    SectionTransaccionesComponent,
    SectionCortesComponent,
    IndexComponent,
    NewComponent,
    ModalProductosComponent,
    ModalInventarioComponent,
    TablaProductosAgregadosComponent,
    BreadcrumbComponent,
    TablaResumenPagosComponent,
    TablaOrdenPagosComponent,
    ModalPagoEfectivoComponent,
    SectionTicketComponent,
    ViewComponent,
    LoginComponent,
    ModalPagoTarjetaComponent,
    CortesComponent,
    CorteParcialModalComponent,
    CorteDiarioModalComponent,
    CorteMensualModalComponent,
    BtnAperturaCajaComponent,
    CortesIndex,
    SesionesIndex,
    CortesView,
    SectionConsumidorFinalComponent,
    SectionCreditoFiscalComponent,
    DevolucionesIndexComponent,
    DevolucionesNewComponent,
    DevVentaprodModalComponent,
    ConfigIndexComponent,
    NumeradoresIndexComponent,
    OtrosIngIndexComponent,
    OtrosEgrIndexComponent,
    OtrosIngresosNewComponent,
    OtrosEgresisNewComponent,
    ImportarProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
