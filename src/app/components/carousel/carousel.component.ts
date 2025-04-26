import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent {
  @Input() produtos: Produto[][] = []; // Array bidimensional de produtos
  produtosUnicos: Produto[] = []; // Array unidimensional de produtos

  ngOnInit(): void {
    if (this.produtos && Array.isArray(this.produtos)) {
      this.produtosUnicos = this.produtos.flat();
    } else {
      console.warn('O array de produtos não foi inicializado corretamente.');
      this.produtosUnicos = []; // Inicializa como array vazio
    }
  }
}
