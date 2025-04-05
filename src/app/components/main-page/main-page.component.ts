import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProdutoService } from '../../services/produto/produto.service';

interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  descricao: string; 
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, CarouselComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  produtos: Produto[][] = []; // Array unidimensional

  constructor(private produtoService: ProdutoService) { }
  
  ngOnInit(): void {
    // Achata o array bidimensional em um array unidimensional
    this.produtos = this.produtoService.getProdutos();
  }
}