import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Products } from './products/products';
import { ProductCard } from './product-card/product-card';
import { ProductDetail } from './product-detail/product-detail';

@NgModule({
  declarations: [
    App,
    Products,
    ProductCard,
    ProductDetail,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // No usar HttpClientModule aqui
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }