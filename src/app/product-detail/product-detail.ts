import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';          // lee parametros de la URL
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service'; // NUEVO

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {

  // Propiedades
  detalle: any = null;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,   // para leer el :id de la URL
    private productService: ProductService,
    private cartService: CartService // NUEVO
  ) { }

  ngOnInit(): void {
    // 1. Leer el parametro :id de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 2. Pedir el producto a la API usando el servicio
    this.cargando = true;
    this.productService.getProductById(id).subscribe(
      (response) => {
        this.detalle = response;
        this.cargando = false;
      },
      (error) => {
        console.error('Error:', error);
        this.error = 'No se pudo cargar el producto.';
        this.cargando = false;
      }
    );
  }

  agregarAlCarrito(): void {
    if (this.detalle) {
      this.cartService.addToCart(this.detalle);
    }
  }
  
}