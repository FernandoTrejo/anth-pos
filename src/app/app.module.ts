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
    LoginComponent
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
