import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { IndexComponent as VentasIndexComponent } from './pages/ventas/index/index.component';
import { NewComponent as VentasNewComponent } from './pages/ventas/new/new.component';
import { ViewComponent as VentasViewComponent } from './pages/ventas/view/view.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { CorteActivateGuardService } from './services/auth/corte-activate-guard.service';
import { IndexComponent as SesionesIndex } from './pages/sesiones/index/index.component';
import { IndexComponent as CortesIndex } from './pages/cortes/index/index.component';
import { ViewComponent as CortesView } from './pages/cortes/view/view.component';
import { DevolucionesIndexComponent } from './pages/devoluciones/devoluciones-index/devoluciones-index.component';
import { DevolucionesNewComponent } from './pages/devoluciones/devoluciones-new/devoluciones-new.component';
import { ConfigIndexComponent } from './pages/configuraciones/config-index/config-index.component';
import { NumeradoresIndexComponent } from './pages/configuraciones/numeradores/numeradores-index/numeradores-index.component';
import { OtrosIngIndexComponent } from './pages/otros-ingresos/otros-ing-index/otros-ing-index.component';
import { OtrosEgrIndexComponent } from './pages/otros-egresos/otros-egr-index/otros-egr-index.component';
import { ImportarProductosComponent } from './pages/configuraciones/productos/importar-productos/importar-productos.component';
import { ClientesIndexComponent } from './pages/clientes/clientes-index/clientes-index.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuardService] },
  { path: 'clientes', component: ClientesIndexComponent, canActivate: [AuthGuardService] },
  { path: 'sesiones', component: SesionesIndex, canActivate: [AuthGuardService]},
  { path: 'cortes', component: CortesIndex, canActivate: [AuthGuardService]},
  { path: 'cortes/:codigo_corte', component: CortesView, canActivate: [AuthGuardService]},
  { path: 'ventas', component: VentasIndexComponent, canActivate: [CorteActivateGuardService] },
  { path: 'ventas/nueva', component: VentasNewComponent, canActivate: [CorteActivateGuardService] },
  { path: 'ventas/:codigo_venta', component: VentasViewComponent, canActivate: [CorteActivateGuardService] },
  { path: 'otros-ingresos', component: OtrosIngIndexComponent, canActivate: [CorteActivateGuardService] },
  { path: 'otros-egresos', component: OtrosEgrIndexComponent, canActivate: [CorteActivateGuardService] },
  { path: 'devoluciones', component: DevolucionesIndexComponent, canActivate: [CorteActivateGuardService]},
  { path: 'devoluciones/nueva', component: DevolucionesNewComponent, canActivate: [CorteActivateGuardService]},
  { path: 'configuraciones', component: ConfigIndexComponent, canActivate: [AuthGuardService]},
  { path: 'configuraciones/numeradores', component: NumeradoresIndexComponent, canActivate: [AuthGuardService]},
  { path: 'configuraciones/productos', component: ImportarProductosComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
