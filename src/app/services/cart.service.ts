import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  userId: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  subtotal: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCartForCurrentUser();
  }

  private getCurrentUserId(): number | null {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user.id;
  }

  private getCartMap(): Record<string, CartItem[]> {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : {};
  }

  private saveCartMap(map: Record<string, CartItem[]>): void {
    localStorage.setItem('cart', JSON.stringify(map));
  }

  loadCartForCurrentUser(): void {
    const userId = this.getCurrentUserId();
    if (!userId) {
      this.cartItems.next([]);
      return;
    }
    const map = this.getCartMap();
    this.cartItems.next(map[userId] || []);
  }

  addToCart(product: any): void {
    const userId = this.getCurrentUserId();
    if (!userId) return;

    const current = [...this.cartItems.getValue()];
    const idx = current.findIndex(i => i.productId === product.id);

    if (idx >= 0) {
      current[idx].quantity += 1;
      current[idx].subtotal = current[idx].price * current[idx].quantity;
    } else {
      current.push({
        userId: userId,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        subtotal: product.price
      });
    }

    this.persistCurrentUserCart(current, userId);
  }

  updateQuantity(productId: number, quantity: number): void {
    const userId = this.getCurrentUserId();
    if (!userId) return;

    const updated = this.cartItems.getValue().map(item => {
      if (item.productId !== productId) return item;
      const qty = Math.max(1, quantity);
      return { ...item, quantity: qty, subtotal: item.price * qty };
    });

    this.persistCurrentUserCart(updated, userId);
  }

  removeFromCart(productId: number): void {
    const userId = this.getCurrentUserId();
    if (!userId) return;

    const updated = this.cartItems.getValue().filter(item => item.productId !== productId);
    this.persistCurrentUserCart(updated, userId);
  }

  clearCart(): void {
    const userId = this.getCurrentUserId();
    if (!userId) return;
    this.persistCurrentUserCart([], userId);
  }

  getTotal(): number {
    return this.cartItems.getValue().reduce((acc, item) => acc + item.subtotal, 0);
  }

  getCount(): number {
    return this.cartItems.getValue().reduce((acc, item) => acc + item.quantity, 0);
  }

  private persistCurrentUserCart(items: CartItem[], userId: number): void {
    const map = this.getCartMap();
    map[userId] = items;
    this.saveCartMap(map);
    this.cartItems.next(items);
  }
}