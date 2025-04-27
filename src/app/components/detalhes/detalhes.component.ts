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
    private produtoService: ProdutoService,
    public cartService: CartService
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
}
