import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';  // NUEVO

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  items: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadCartForCurrentUser();
    this.cartService.cartItems$.subscribe(r => this.items = r);
  }

  sumar(item: any): void {
    this.cartService.updateQuantity(item.productId, item.quantity + 1);
  }

  restar(item: any): void {
    this.cartService.updateQuantity(item.productId, item.quantity - 1);
  }

  eliminar(item: any): void {                              // NUEVO — modal de confirmacion
    Swal.fire({
      title:              '¿Eliminar producto?',
      text:               `${item.title} será removido del carrito`,
      icon:               'warning',
      showCancelButton:   true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor:  '#6c757d',
      confirmButtonText:  'Sí, eliminar',
      cancelButtonText:   'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {                            // solo elimina si el usuario confirma
        this.cartService.removeFromCart(item.productId);
        Swal.fire('Eliminado', `${item.title} fue removido del carrito`, 'success');
      }
    });
  }

  pagar(): void {
    const total: Number = Number(this.total().toFixed(2));
    Swal.fire({
      title:              '¿Realizar el pago?',
      text:               `¿Se realizara el pago por la cantidad de: $${total}`,
      icon:               'question',
      showCancelButton:   true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor:  '#6c757d',
      confirmButtonText:  'Sí, pagar',
      cancelButtonText:   'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {                            // solo elimina si el usuario confirma
        Swal.fire('Pagado', `La compra se realizo con exito!`, 'success');
      }
    });
  }

  total(): number {
    return this.cartService.getTotal();
  }
}