import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto/produto.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { switchMap, take } from 'rxjs';

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
    this.route.queryParams.pipe(
      switchMap(params => {
        this.searchTerm = params['q'] || '';
        return this.produtoService.getProdutos().pipe(take(1));
      })
    ).subscribe({
      next: (produtos) => {
        const produtosArray = produtos as Produto[];
        this.filteredItems = produtosArray.flat().filter(produto =>
          produto.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
      error: (err) => {
        console.error('Erro ao carregar os produtos:', err);
      }
    });
  }
}
