import { Component, OnInit } from '@angular/core';

@Component({
  selector:    'app-products',
  templateUrl: './products.html',
  standalone: false,
  styleUrls:   ['./products.css']
})
export class Products implements OnInit {

  //  Propiedades
  titulo = 'Proyecto API';
  valor  = '';
  busqueda = '';
  data:  any = [];
  detalle: any = null;

  //  Datos mock - en Clase 6 vendran de la API
  productosMock = [
    { id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, category: "men's clothing", image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png' },
    { id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts ', price: 22.30, category: "men's clothing", image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png' },
    { id: 3, title: 'Mens Cotton Jacket', price: 55.99, category: "men's clothing", image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png' },
    { id: 4, title: 'Mens Casual Slim Fit', price: 15.99, category: "men's clothing", image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png' },
    { id: 5, title: 'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet', price: 695.00, category: 'jewelery', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png' },
    { id: 6, title: 'Solid Gold Petite Micropave ', price: 168.00, category: 'jewelery', image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png' },
    { id: 7, title: 'White Gold Plated Princess', price: 9.99, category: 'jewelery', image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png' },
    { id: 8, title: 'Pierced Owl Rose Gold Plated Stainless Steel Double', price: 10.99, category: 'jewelery', image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.data = this.productosMock;
  }

  //  Filtrar por categoria
  filtrarCat(event: any): void {
    this.valor = event.target.value;
    if (this.valor === 'all') {
      this.data = this.productosMock;
    } else {
      this.data = this.productosMock.filter(p => p.category === this.valor);
    }
  }

  //  Filtrar por nombre
  filtrarNombre(event: any): void {
    this.valor = event.target.value.toLowerCase();
    if (this.valor === '') {
      this.data = this.productosMock;
    } else {
      this.data = this.productosMock.filter(p =>
        p.title.toLowerCase().includes(this.valor)
      );
    }
  }

  //  Filtrar por nombre usando ngModel
  filtrarNombreNgModel(): void {
    const texto = this.busqueda.toLowerCase();
    if (texto === '') {
      this.data = this.productosMock;
    } else {
      this.data = this.productosMock.filter(p =>
        p.title.toLowerCase().includes(texto)
      );
    }
  }

  //  Ver detalle de un producto - abre modal
  detallePro(productId: number): void {
    const producto = this.productosMock.find(p => p.id === productId);
    this.detalle = producto;
    console.log('Producto seleccionado:', producto);
  }
}