import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';  // NUEVO

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  // Propiedades — igual que en Clase 5
  titulo = 'Proyecto API';
  valor = '';
  busqueda = '';
  data: any = [];
  detalle: any = null;
  categories: any = [];
  cargando: boolean = false;

  // Constructor — ahora inyecta el servicio en lugar del HttpClient directo
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.productService.getProducts().subscribe(
      (response) => { this.data = response;  this.cargando = false; },
      (error) => { console.error('Error:', error);  this.cargando = false; }
    );

    this.productService.getCategories().subscribe(
      (response) => { this.categories = response; },
      (error) => { console.error('Error categories:', error); }
    );

  }

  // filtrarCat — ahora llama a la API por categoria
  filtrarCat(event: any): void {
    this.valor = event.target.value;
    if (this.valor === 'all') {
      this.productService.getProducts().subscribe(
        (response) => { this.data = response; },
        (error) => { console.error('Error:', error); }
      );
    } else {
      this.productService.getProductsByCategory(this.valor).subscribe(
        (response) => { this.data = response; },
        (error) => { console.error('Error:', error); }
      );
    }
  }

  // filtrarNombre — ahora filtra sobre los datos ya cargados
  filtrarNombre(event: any): void {
    this.valor = event.target.value;
    if (this.valor === '') {
      this.productService.getProducts().subscribe(
        (response) => { this.data = response; },
        (error) => { console.error('Error:', error); }
      );
    } else {
      this.productService.getProducts().subscribe(
        (response) => {
          const v = this.valor.toLowerCase();
          this.data = (response as any[]).filter(p => p.title.toLowerCase().includes(v));
        },
        (error) => { console.error('Error:', error); }
      );
    }
  }

  // filtrarNombreNgModel — filtra usando la propiedad enlazada con ngModel
  filtrarNombreNgModel(): void {
    this.valor = this.busqueda;
    if (this.valor === '') {
      this.productService.getProducts().subscribe(
        (response) => { this.data = response; },
        (error) => { console.error('Error:', error); }
      );
    } else {
      this.productService.getProducts().subscribe(
        (response) => {
          const v = this.valor.toLowerCase();
          this.data = (response as any[]).filter(p => p.title.toLowerCase().includes(v));
        },
        (error) => { console.error('Error:', error); }
      );
    }
  }

  // detallePro — ahora llama a la API por id
  detallePro(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (response) => { this.detalle = response; },
      (error) => { console.error('Error:', error); }
    );
  }
}