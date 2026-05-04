import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Products } from './products/products';
import { ProductCard } from './product-card/product-card';


@NgModule({
  declarations: [
    App,
    Products,
    ProductCard,
    // Aqui se registra CADA componente que crees
    // ng generate component lo hace automaticamente
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // HttpClientModule ira aqui en Clase 6
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }