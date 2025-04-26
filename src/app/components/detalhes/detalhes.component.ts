import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto/produto.service';
import { CartService } from '../../services/cart/cart.service';
import { CartComponent } from '../cart/cart.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})

export class DetalhesComponent implements OnInit {

  produto: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produtoService.getProdutoById(id).pipe(take(1)).subscribe({
      next: (produto) => {
        this.produto = produto;
        console.log('Produto carregado:', this.produto);
      },
      error: (err) => {
        console.error(`Erro ao carregar o produto com ID ${id}:`, err);
        this.produto = null; // Define como null em caso de erro
      }
    });
  }

  addCarrinho(): void {
    if (!this.produto) {
      console.error('Nenhum produto para adicionar ao carrinho.');
      return;
    }
  
    this.cartService.addItem(this.produto).subscribe({
      next: () => {
        console.log('Produto adicionado ao carrinho:', this.produto);
        this.cartService.openCart(); // Abre o carrinho após adicionar o item
      },
      error: (err) => {
        console.error('Erro ao adicionar o produto ao carrinho:', err);
      }
    });
  }
}
