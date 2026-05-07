import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector:    'app-root',
  standalone:  false,
  templateUrl: './app.html',
  styleUrl:    './app.css'
})
export class App implements OnInit {

  contadorCarrito: number = 0;

  constructor(
    public  authService: AuthService,  // public para usarlo directamente en app.html
    private cartService: CartService,
    private router:      Router
  ) { }

  ngOnInit(): void {
    // Suscribirse al carrito — contadorCarrito se actualiza automaticamente
    this.cartService.cartItems$.subscribe(items => {
      this.contadorCarrito = items.length;
    });
  }

  logout(): void {
    this.authService.logout();
    // currentUser ya fue eliminado del localStorage — loadCartForCurrentUser emite [] y el contador vuelve a 0
    this.cartService.loadCartForCurrentUser();  // NUEVO — resetea contador a 0
    this.router.navigate(['/login']);
  }
}