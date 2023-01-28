import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { IndexComponent as VentasIndexComponent} from './pages/ventas/index/index.component';
import { NewComponent as VentasNewComponent } from './pages/ventas/new/new.component';
import { ViewComponent as VentasViewComponent } from './pages/ventas/view/view.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'ventas', component: VentasIndexComponent},
  {path: 'ventas/nueva', component: VentasNewComponent},
  {path: 'ventas/:codigo_venta', component: VentasViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
