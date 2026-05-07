import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
//import { CartService } from '../services/cart.service';  // NUEVO — para cargar carrito del usuario

@Component({
  selector:    'app-login',
  standalone:  false,
  templateUrl: './login.html',
  styleUrl:    './login.css'
})
export class Login {

  // Propiedades — mismo patron que Products
  username: string  = '';
  password: string  = '';
  error:    string  = '';
  loading:  boolean = false;

  constructor(
    private authService: AuthService,
   // private cartService: CartService,  // NUEVO
    private router:      Router
  ) { }

  login(): void {
    this.loading = true;
    this.error   = '';

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // El token y currentUser ya estan en localStorage (los guarda AuthService)
        // Cargar el carrito del usuario que acaba de entrar
        //this.cartService.loadCartForCurrentUser();  // NUEVO
        this.router.navigate(['/products']);  // redirige al catalogo
      },
      (error) => {
        this.error   = 'Usuario o contrasena incorrectos.';
        this.loading = false;
      }
    );
  }
}