import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  items$: Observable<any[]> = of([]); // Variável local para os itens do carrinho
  total$: Observable<number> = of(0);

  constructor(
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.items$ = this.cartService.getItems(); // Carrega os itens do carrinho
    this.total$ = this.cartService.getTotal();
  }
}