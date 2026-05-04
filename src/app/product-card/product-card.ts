import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tr[app-product-card]',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product: any = null;
  @Output() detalle = new EventEmitter<number>();

  verDetalle(): void {
    if (this.product) {
      this.detalle.emit(this.product.id);
    }
  }
}