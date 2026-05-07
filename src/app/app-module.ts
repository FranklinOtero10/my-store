import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App }           from './app';
import { Products }      from './products/products';
import { ProductCard }   from './product-card/product-card';
import { ProductDetail } from './product-detail/product-detail';
import { Login }         from './login/login';           // NUEVO
import { Users }         from './users/users';           // NUEVO
import { Cart }          from './cart/cart';             // NUEVO
import { AuthInterceptor } from './interceptors/auth.interceptor';  // NUEVO

@NgModule({
  declarations: [
    App,
    Products,
    ProductCard,
    ProductDetail,
    Login,    // NUEVO
    Users,    // NUEVO
    Cart,     // NUEVO
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // HttpClientModule ya no se usa (deprecated)
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:    true   // permite multiples interceptores en la misma app
    }
  ],
  bootstrap: [App]
})
export class AppModule { }