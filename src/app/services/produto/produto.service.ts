import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos = [
    [
      { id: 1, nome: 'Produto 1', preco: 'R$ 99,00', imagem: '/assets/images/produtos/Mask1.gif', descricao: 'Quando é necessário demonstrar neutralidade.' },
      { id: 2, nome: 'Produto 2', preco: 'R$ 89,00', imagem: '/assets/images/produtos/Mask2.gif', descricao: 'Destemido, mas ao mesmo tempo descolado.' },
      { id: 3, nome: 'Produto 3', preco: 'R$ 79,00', imagem: '/assets/images/produtos/Mask3.gif', descricao: 'Ele pode ferir seus sentimentos.' }
    ],
    [
      { id: 4, nome: 'Produto 4', preco: 'R$ 120,00', imagem: '/assets/images/produtos/Mask4.gif', descricao: 'Um coelho? Um urso? Apenas saiba que roxo nunca é uma boa cor.' },
      { id: 5, nome: 'Produto 5', preco: 'R$ 110,00', imagem: '/assets/images/produtos/Mask5.gif', descricao: 'Fácil de ler, mas também aberto a todos.' },
      { id: 6, nome: 'Produto 6', preco: 'R$ 99,90', imagem: '/assets/images/produtos/Mask6.gif', descricao: 'A vida tem seus momentos felizes... às vezes.' }
    ]
  ];

  getProdutos() {
    return this.produtos; // Retorna um array bidimensional
  }
}