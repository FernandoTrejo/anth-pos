import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { IndexComponent as VentasIndexComponent} from './pages/ventas/index/index.component';
import { NewComponent as VentasNewComponent } from './pages/ventas/new/new.component';
import { ViewComponent as VentasViewComponent } from './pages/ventas/view/view.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'productos', component: ProductosComponent, canActivate: [AuthGuardService]},
  {path: 'ventas', component: VentasIndexComponent, canActivate: [AuthGuardService]},
  {path: 'ventas/nueva', component: VentasNewComponent, canActivate: [AuthGuardService]},
  {path: 'ventas/:codigo_venta', component: VentasViewComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
