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
    // Achata o array bidimensional em um array unidimensional
    this.produtosUnicos = this.produtos.flat();
  }
}
