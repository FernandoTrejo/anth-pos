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

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuardService] },
  { path: 'sesiones', component: SesionesIndex},
  { path: 'cortes', component: CortesIndex},
  { path: 'ventas', component: VentasIndexComponent, canActivate: [CorteActivateGuardService] },
  { path: 'ventas/nueva', component: VentasNewComponent, canActivate: [CorteActivateGuardService] },
  { path: 'ventas/:codigo_venta', component: VentasViewComponent, canActivate: [CorteActivateGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
