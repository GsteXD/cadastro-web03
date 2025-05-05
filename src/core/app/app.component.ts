import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CartService } from '../../app/services/cart/cart.service';
import { CartComponent } from '../../app/components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    CartComponent, 
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  searchTerm: string = ''; // Termo de busca
  totalItems$: Observable<any> = of(0);

  constructor(
    public cartService: CartService,
    private router: Router, // Rota para barra de navegação
    private titleService: Title, // Título da página
    private activatedRoute: ActivatedRoute
  ) {}

  // Captura o valor do campo de texto
  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
  }

  search(): void {
    if (this.searchTerm.trim()) {
      // Redireciona para a página de busca com o termo como parâmetro
      this.router.navigate(['/busca'], { queryParams: { q: this.searchTerm } });
    }
  }
  
  ngOnInit(): void {
    this.totalItems$ = this.cartService.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.quantidade, 0))
    );
  }
}