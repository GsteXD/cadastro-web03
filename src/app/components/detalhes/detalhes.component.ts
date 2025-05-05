import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter, of, Subject, switchMap, take, takeUntil } from 'rxjs';

import { ProdutoService } from '../../services/produto/produto.service';
import { CartService } from '../../services/cart/cart.service';
import { triggerAsyncId } from 'async_hooks';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})

export class DetalhesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    public route: ActivatedRoute,
    public cartService: CartService,
    public produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      const id = Number(params.get('id'));
      if(id) {
        this.produtoService.getProdutoById(id).subscribe();
      }
    });
    this.cartService.fetchCart();
  }

  addCart(quantidade: number = 1): void {
    this.produtoService.currentProduct$.pipe(
      take(1),
      filter(produto => !!produto),
      switchMap(produto => this.cartService.addItem(produto, quantidade)),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => this.cartService.openCart(),
      error: (err) => console.error('Erro ao adicionar item:', err)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
}

}
