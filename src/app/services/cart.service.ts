import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Funções para a aba de carrinho
export class CartService {
  private cartItems: any[] = [];
  private cartVisible = false; // BehaviorSubject para controlar visibilidade

  constructor() {}

  getItems() {
    return this.cartItems;
  }

  openCart() {
    this.cartVisible = true;
  }

  getCartVisibility() {
    console.log(this.cartVisible);
    return this.cartVisible; 
  }

  toggleCart() { 
    this.cartVisible = !this.cartVisible; 
    console.log(this.cartVisible);
  }

  addItem(produto: any) {
    let item = this.cartItems.find(p => p.id === produto.id);
    if (item) {
      item.quantidade += 1;
    } else {
      this.cartItems.push({ ...produto, quantidade: 1 });
    }
    console.log("Entrou")
  }

  removeOneItem(produto: any) {
    let item = this.cartItems.find(p => p.id === produto.id);
    if (item) {
      item.quantidade -= 1;
      if (item.quantidade === 0) {
        this.removeItem(produto.id);
      }
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantidade * parseFloat(item.preco.replace('R$', '').replace(',', '.')), 0
    );
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantidade, 0);
  }

}
