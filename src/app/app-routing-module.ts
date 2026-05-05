import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './products/products';
import { ProductDetail } from './product-detail/product-detail';  // NUEVO

const routes: Routes = [
  { path: '',            redirectTo: '/products', pathMatch: 'full' },
  { path: 'products',    component: Products,     title: 'Gestion de Productos' },
  { path: 'product/:id', component: ProductDetail, title: 'Detalle Producto' },  // NUEVO
  // { path: 'users', ... }    — Clase 7 (ruta protegida)
  // { path: 'login', ... }    — Clase 7
  // { path: 'cart', ... }     — Clase 7
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }