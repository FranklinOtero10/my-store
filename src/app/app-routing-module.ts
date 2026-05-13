import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './products/products';
import { ProductDetail } from './product-detail/product-detail';
import { Login } from './login/login';           // NUEVO
import { Users } from './users/users';           // NUEVO
import { Cart }  from './cart/cart';             // NUEVO
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',            redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetail },
  { path: 'login', component: Login },
  { path: 'cart', component: Cart },
  { path: 'users', component: Users, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }