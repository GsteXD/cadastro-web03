import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, CarouselComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  produtos = [
    [
      { id: 1, nome: 'Produto 1', preco: 'R$ 99,00', imagem: 'produto1.jpg' },
      { id: 2, nome: 'Produto 2', preco: 'R$ 89,00', imagem: 'produto2.jpg' },
      { id: 3, nome: 'Produto 3', preco: 'R$ 79,00', imagem: 'produto3.jpg' }
    ],
    [
      { id: 4, nome: 'Produto 4', preco: 'R$ 120,00', imagem: 'produto4.jpg' },
      { id: 5, nome: 'Produto 5', preco: 'R$ 110,00', imagem: 'produto5.jpg' },
      { id: 6, nome: 'Produto 6', preco: 'R$ 99,90', imagem: 'produto6.jpg' }
    ]
  ];
}
