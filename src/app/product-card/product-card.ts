import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';   // NUEVO
import { AuthService } from '../services/auth.service';   // NUEVO — para verificar si hay sesion

@Component({
  selector:    'tr[app-product-card]',
  standalone:  false,
  templateUrl: './product-card.html',
  styleUrl:    './product-card.css'
})
export class ProductCard {
  @Input() product: any = null;
  @Output() detalle = new EventEmitter<number>();

  constructor(
    private cartService: CartService,   // NUEVO
    public  authService: AuthService    // NUEVO — public para usarlo en el template
  ) { }

  verDetalle(): void {
    if (this.product) {
      this.detalle.emit(this.product.id);
    }
  }

  agregarAlCarrito(): void {    // NUEVO
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}