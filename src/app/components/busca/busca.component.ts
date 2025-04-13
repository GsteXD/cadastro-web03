import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto/produto.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-busca',
  imports: [RouterLink, CommonModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent implements OnInit {
  searchTerm: string = '';
  filteredItems: Produto[] = [];

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
   ) {}

  ngOnInit(): void {
    // Captura o termo da URL
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
      this.filteredItems = this.produtoService
        .getProdutos()
        .flat()
        .filter(produto =>
          produto.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    });
  }
}
