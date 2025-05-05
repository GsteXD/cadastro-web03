import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, Subject, takeUntil } from 'rxjs';

import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  items$: Observable<any[]> = of([]);
  total$: Observable<number> = of(0);
  isCartOpen$: Observable<boolean> = of(false);
  loading$: Observable<boolean> = of(false);

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    // Variável locais
    this.items$ = this.cartService.cartItems$;
    this.total$ = this.cartService.total$;
    this.isCartOpen$ = this.cartService.isCartOpen$;
    this.loading$ = this.cartService.loading$;

    this.cartService.fetchCart().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => console.log('Carrinho carregado!'),
      error: (err) => console.error('Erro ao carregar carrinho:', err)
    });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
  
  updateQuantidade(id: number, quantity: number | string): void {
    if (typeof quantity === 'string') {
      quantity = parseInt(quantity, 10);
    }

    if (isNaN(id) || id <= 0) {
      console.error('ID não é um número', id);
      return;
    }

    this.cartService.updateQuantity(id, quantity).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      error: (err) => console.error('Erro ao atualizar quantidade:', err)
    });
  }

  removeProduto(id: number): void {
    this.cartService.removeItem(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      error: (err) => console.error('Erro ao remover produto', err)
    });
  }

  finalizarPedido(): void {
    this.cartService.finalizeOrder().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      error: (err) => console.error('Falha no pedido:', err)
    });
  }
}