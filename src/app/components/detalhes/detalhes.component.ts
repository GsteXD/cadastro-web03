import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})

export class DetalhesComponent implements OnInit {

  produto: any;

  //TODO: Adicionar imagem dos produtos
  produtos = [
    { id: 1, nome: 'Produto 1', preco: 'R$ 99,00', imagem: 'assets/produto1.jpg', descricao: 'Descrição do produto 1' },
    { id: 2, nome: 'Produto 2', preco: 'R$ 89,00', imagem: 'assets/produto2.jpg', descricao: 'Descrição do produto 2' },
    { id: 3, nome: 'Produto 3', preco: 'R$ 79,00', imagem: 'assets/produto3.jpg', descricao: 'Descrição do produto 3' },
    { id: 4, nome: 'Produto 4', preco: 'R$ 120,00', imagem: 'produto4.jpg', descricao: 'Descrição do produto 4' },
    { id: 5, nome: 'Produto 5', preco: 'R$ 110,00', imagem: 'produto5.jpg', descricao: 'Descrição do produto 5' },
    { id: 6, nome: 'Produto 6', preco: 'R$ 99,90', imagem: 'produto6.jpg', descricao: 'Descrição do produto 6' }
  ];

  constructor(private route: ActivatedRoute) {}

  //Função ativada ao inicializar a página
  ngOnInit(): void {
      // Captura o id da URL
      const id = Number(this.route.snapshot.paramMap.get('id'));
      // Busca pelo produto
      this.produto = this.produtos.find(p => p.id === id);
  }
}
