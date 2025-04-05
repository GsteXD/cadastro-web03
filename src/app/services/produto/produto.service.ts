import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos = [
    [
      { id: 1, nome: 'Produto 1', preco: 'R$ 99,00', imagem: 'assets/produto1.jpg', descricao: 'Descrição do produto 1' },
      { id: 2, nome: 'Produto 2', preco: 'R$ 89,00', imagem: 'assets/produto2.jpg', descricao: 'Descrição do produto 2' },
      { id: 3, nome: 'Produto 3', preco: 'R$ 79,00', imagem: 'assets/produto3.jpg', descricao: 'Descrição do produto 3' }
    ],
    [
      { id: 4, nome: 'Produto 4', preco: 'R$ 120,00', imagem: 'assets/produto4.jpg', descricao: 'Descrição do produto 4' },
      { id: 5, nome: 'Produto 5', preco: 'R$ 110,00', imagem: 'assets/produto5.jpg', descricao: 'Descrição do produto 5' },
      { id: 6, nome: 'Produto 6', preco: 'R$ 99,90', imagem: 'assets/produto6.jpg', descricao: 'Descrição do produto 6' }
    ]
  ];

  getProdutos() {
    return this.produtos; // Retorna um array bidimensional
  }
}