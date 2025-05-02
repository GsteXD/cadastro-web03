import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto/produto.service';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent {
  carouselProdutos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        console.log('(carouselComponent)Resposta da API:', produtos);
        this.carouselProdutos = produtos;
      },
      error: (err) => {
        console.error('Erro ao carregar os produtos:', err);
      }
    });
  }
}
