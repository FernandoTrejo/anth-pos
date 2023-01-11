import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { IndexComponent as VentasIndexComponent} from './pages/ventas/index/index.component';
import { NewComponent as VentasNewComponent } from './pages/ventas/new/new.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'ventas', component: VentasIndexComponent},
  {path: 'ventas/nueva', component: VentasNewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
