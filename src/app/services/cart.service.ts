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
  //Adiciona o item no carrinho e incrementa o contador em 1
  addItem(produto: any) {
    let item = this.cartItems.find(p => p.id === produto.id);
    if (item) {
      item.quantidade += 1;
    } else {
      this.cartItems.push({ ...produto, quantidade: 1 });
    }
    console.log("Entrou")
  }
  //Remove apenas um item do produto, diminuindo a contagem em 1
  removeOneItem(produto: any) {
    let item = this.cartItems.find(p => p.id === produto.id);
    if (item) {
      item.quantidade -= 1;
      //Se chegar em 0, remove o produto do carrinho
      if (item.quantidade === 0) {
        this.removeItem(produto.id);
      }
    }
  }
  //Remove todo o produto a partir de seu id
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

  finalizarPedido() {
    if (this.cartItems.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }    
    // Log de verificação
    console.log("Pedido gravado:", this.cartItems);

    // Limpa o carrinho após a finalização
    this.cartItems = [];
    
    // Exibe mensagem de sucesso
    alert("Pedido finalizado com sucesso!");

    // Esconde o carrinho
    this.cartVisible = false;
  }
}
