import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProdutoService } from '../../services/produto/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, CommonModule, CarouselComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

//Página principal do site, onde são exibidos os produtos
export class MainPageComponent implements OnInit{
  produtos: Produto[][] = []; // Array unidimensional

  constructor(private produtoService: ProdutoService) { }
  
  ngOnInit(): void {
    // Achata o array bidimensional em um array unidimensional
    this.produtos = this.produtoService.getProdutos();
  }
}