import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ProdutoService } from '../../services/produto/produto.service';
import { CartService } from '../../services/cart/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, CartComponent],
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

  //Função ativada ao inicializar a página
  ngOnInit(): void {
      // Captura o id da URL
      const id = Number(this.route.snapshot.paramMap.get('id'));
      // Busca pelo produto
      this.produto = this.produtoService.getProdutos().flat().find(p => p.id === id);

      if (!this.produto) {
        console.error(`Produto com ID ${id} não encontrado.`);
      } else {
        console.log('Produto carregado:', this.produto);
      }

  }

  addCarrinho() {
    this.cartService.addItem(this.produto);
    this.cartService.openCart();
  }
}
