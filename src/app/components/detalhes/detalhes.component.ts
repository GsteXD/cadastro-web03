import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

import { ProdutoService } from '../../services/produto/produto.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})

export class DetalhesComponent implements OnInit {

  produto: any;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const idParam = paramMap.get('id');
      console.log('idParam extraído da rota:', idParam, 'SSR:', typeof window === 'undefined');
      const id = Number(idParam);
  
      if (!id || isNaN(id)) {
        console.error(`ID inválido: ${idParam}`);
        this.produto = null;
        return;
      }
  
      this.cartService.loadCart().subscribe();
  
      this.produtoService.getProdutoById(id).pipe(take(1)).subscribe({
        next: (produto) => {
          this.produto = produto;
          console.log('Produto carregado:', this.produto);
        },
        error: (err) => {
          console.error(`Erro ao carregar o produto com ID ${id}:`, err);
          this.produto = null;
        }
      });
    });
  }
  adicionarAoCarrinho(produto:any, quantidade:number): void {
    const item = { ...produto, quantidade };
    this.cartService.AddCart(item).subscribe({
      next: () => {
        console.log('Produto adicionado ao carrinho:', item);
        this.cartService.openCart();
        this.cartService.loadCart().subscribe(() => {
          console.log('(detalhes) Carrinho atualizado');
        });
      },
      error: (err) => console.error('(detalhes)Erro ao adicionar no carrinho:', err)
    });
  }
}
