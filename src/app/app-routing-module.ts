import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './products/products';

const routes: Routes = [
  // { path: 'products', component: Products, title: 'Productos' },   Clase 6
  // { path: 'product/:id', ... }   Clase 6
  // { path: 'users', ... }         Clase 6
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
