import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent {
  //Pega os dados disponíveis em uma lista presente no componente pai. (nesse caso, a página principal)
  @Input() produtos: { id: number; nome: string; preco: string; imagem: string }[][] = [];
}
