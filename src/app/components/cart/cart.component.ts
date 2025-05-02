import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  // Variável local para os itens do carrinho
  items$: Observable<any[]> = of([]);
  total$: Observable<number> = of(0);
  // Variável local para o estado de visibilidade
  isCartVisible: boolean = false;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadCart().subscribe();

    this.items$ = this.cartService.getCartItems();
    this.total$ = this.cartService.getTotal();

    // Logs para verificar os valores
    this.items$.subscribe(items => console.log('Itens do carrinho:', items));
    this.total$.subscribe(total => console.log('Total do carrinho:', total));


    this.cartService.getCartVisibility().subscribe((isVisible) => {
      this.isCartVisible = isVisible;
    });
  }

  onQuantidadeChange(item: any, novaQuantidade: string) {
    const quantidade = parseInt(novaQuantidade, 10);
    if (isNaN(quantidade) || quantidade <= 0) return;
  
    this.cartService.updateItemQuantity(item.id, quantidade).subscribe({
      next: () => console.log(`Quantidade de ${item.nome} atualizada para ${quantidade}`),
      error: (err) => console.error('Erro ao atualizar quantidade', err)
    });
  }

  addItem(item: any): void {
    this.cartService.AddCart(item).subscribe({
      next: () => console.log('(cartComponent) Item adicionado ao carrinho', item),
      error: (err) => console.error('(cartComponent)Erro ao adicionar no carrinho', err)
    });
  }

  addOneItem(item: any): void {
    this.cartService.addOneItem(item).subscribe({
      next: () => console.log('(cartComponent) 1 unidade adicionada', item),
      error: (err) => console.error('(cartComponent) Erro ao adicionar 1 unidade', err)
    });
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id).subscribe({
      next: () => console.log(`(carrinhoComponent) ID: ${id} Removido com sucesso`),
      error: (err) => console.error('Erro ao remover produto')
    });
  }

  removeOneItem(item: any): void {
    this.cartService.removeOneItem(item).subscribe({
      next: () => console.log('(carrinhoComponent) Quantidade reduzida:', item),
      error: (err) => console.error('(carrinhoComponent) Erro ao reduzir quantidade')
    });
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }
}